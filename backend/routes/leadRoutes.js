import express from 'express';
import Lead from '../models/Lead.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// ===============================
// CREATE LEAD
// POST /api/leads
// ===============================

router.post('/', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, email, and phone number',
      });
    }

    // Make sure MongoDB is connected
    if (req.app.locals.isMongoConnected !== true) {
      return res.status(503).json({
        success: false,
        error: 'Database is currently unavailable',
      });
    }

    // Create lead in MongoDB
    const newLead = await Lead.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your details have been submitted successfully.',
      data: {
        _id: newLead._id,
        name: newLead.name,
        email: newLead.email,
        phone: newLead.phone,
        createdAt: newLead.createdAt,
      },
      source: 'mongodb',
    });
  } catch (error) {
    console.error('Error creating lead:', error);

    return res.status(500).json({
      success: false,
      error: error.message || 'Server error creating lead',
    });
  }
});

// ===============================
// GET ALL LEADS
// GET /api/leads
// ADMIN ONLY
// ===============================

router.get('/', protectAdmin, async (req, res) => {
  try {
    if (req.app.locals.isMongoConnected !== true) {
      return res.status(503).json({
        success: false,
        error: 'Database is currently unavailable',
      });
    }

    const leads = await Lead.find().sort({
      createdAt: -1,
    });

    return res.json({
      success: true,
      count: leads.length,
      data: leads,
      source: 'mongodb',
    });
  } catch (error) {
    console.error('Error fetching leads:', error);

    return res.status(500).json({
      success: false,
      error: 'Server error fetching leads',
    });
  }
});

// ===============================
// DELETE LEAD
// DELETE /api/leads/:id
// ADMIN ONLY
// ===============================

router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    if (req.app.locals.isMongoConnected !== true) {
      return res.status(503).json({
        success: false,
        error: 'Database is currently unavailable',
      });
    }

    const lead = await Lead.findByIdAndDelete(id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found',
      });
    }

    return res.json({
      success: true,
      message: 'Lead deleted successfully from MongoDB',
      id,
      data: lead,
    });
  } catch (error) {
    console.error('Error deleting lead:', error);

    return res.status(500).json({
      success: false,
      error: 'Server error deleting lead',
    });
  }
});

export default router;