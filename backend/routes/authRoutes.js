import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

const generateToken = (id, username) => {
  const secret = process.env.JWT_SECRET || 'destnation_secret_jwt_key_2026';
  return jwt.sign({ id, username, role: 'admin' }, secret, {
    expiresIn: '7d',
  });
};

// POST /api/admin/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, error: 'Please provide username and password' });
    }

    const defaultUser = process.env.ADMIN_USERNAME || 'admin';
    const defaultPass = process.env.ADMIN_PASSWORD || 'admin123';

    // Check default admin credentials fallback or MongoDB admin model
    let isValid = false;
    let adminId = 'admin_root';

    if (username.trim().toLowerCase() === defaultUser.toLowerCase() && password === defaultPass) {
      isValid = true;
    } else if (req.app.locals.isMongoConnected) {
      const admin = await Admin.findOne({ username: username.trim().toLowerCase() });
      if (admin && (await admin.matchPassword(password))) {
        isValid = true;
        adminId = admin._id;
      }
    }

    if (isValid) {
      const token = generateToken(adminId, username);
      return res.json({
        success: true,
        message: 'Admin login successful',
        token,
        admin: {
          username: username.trim(),
          role: 'admin',
        },
      });
    } else {
      return res.status(401).json({ success: false, error: 'Invalid admin username or password' });
    }
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ success: false, error: 'Server error during login' });
  }
});

// GET /api/admin/me - Verify token
router.get('/me', protectAdmin, (req, res) => {
  res.json({
    success: true,
    admin: req.admin,
  });
});

export default router;
