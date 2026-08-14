import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import leadRoutes from './routes/leadRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb://127.0.0.1:27017/destnation_education';

// ===============================
// Middleware
// ===============================

app.use(cors());
app.use(express.json());

// ===============================
// MongoDB Connection
// ===============================

app.locals.isMongoConnected = false;
app.locals.mongoError = null;

const connectDB = async () => {
  // Already connected
  if (mongoose.connection.readyState === 1) {
    app.locals.isMongoConnected = true;
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    app.locals.isMongoConnected = true;
    app.locals.mongoError = null;

    console.log('✅ Connected to MongoDB successfully!');
  } catch (error) {
    app.locals.isMongoConnected = false;
    app.locals.mongoError = error.message;

    console.error('❌ MongoDB connection failed:', error.message);

    throw error;
  }
};

// ===============================
// Health Check
// ===============================

app.get('/api/health', async (req, res) => {
  try {
    await connectDB();

    res.json({
      status: 'ok',
      mongoConnected: true,
      mongoUriConfigured: !!process.env.MONGODB_URI,
      mongoError: null,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      mongoConnected: false,
      mongoUriConfigured: !!process.env.MONGODB_URI,
      mongoError: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// ===============================
// API Routes
// ===============================

app.use('/api/admin', authRoutes);
app.use('/api/leads', leadRoutes);

// ===============================
// Start Server
// ===============================

app.listen(PORT, () => {
  console.log(
    `🚀 Node.js / Express server listening on port ${PORT}`
  );

  console.log(
    `🔑 Admin Login Endpoint: /api/admin/login`
  );
});