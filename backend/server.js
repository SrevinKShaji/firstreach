import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import leadRoutes from './routes/leadRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/destnation_education';

// Middleware
app.use(cors());
app.use(express.json());

// App level state for Mongo status
app.locals.isMongoConnected = false;
app.locals.mongoError = null;

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => {
    app.locals.isMongoConnected = true;
    console.log('✅ Connected to MongoDB successfully!');
  })
 .catch((err) => {
  app.locals.isMongoConnected = false;
  app.locals.mongoError = err.message;

  console.error('❌ MongoDB connection failed:', err.message);
});
mongoose.connection.on('error', (err) => {
  app.locals.isMongoConnected = false;
  console.warn('Mongo Connection Error:', err.message);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    mongoConnected: app.locals.isMongoConnected,
    mongoError: app.locals.mongoError,
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/admin', authRoutes);
app.use('/api/leads', leadRoutes);

// Start Express Server
app.listen(PORT, () => {
  console.log(`🚀 Node.js / Express server listening on http://localhost:${PORT}`);
  console.log(`🔑 Admin Login Endpoint: http://localhost:${PORT}/api/admin/login`);
});
