import express from 'express';
import Lead from '../models/Lead.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fallbackFilePath = path.join(__dirname, '../data/leads.json');

const ensureFallbackFile = () => {
  const dir = path.dirname(fallbackFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(fallbackFilePath)) {
    fs.writeFileSync(fallbackFilePath, JSON.stringify([]));
  }
};

const getFallbackLeads = () => {
  try {
    ensureFallbackFile();
    const data = fs.readFileSync(fallbackFilePath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    return [];
  }
};

const saveFallbackLeads = (leads) => {
  try {
    ensureFallbackFile();
    fs.writeFileSync(fallbackFilePath, JSON.stringify(leads, null, 2));
  } catch (err) {
    console.error('Error writing fallback leads file:', err);
  }
};

// PUBLIC: POST /api/leads - Create a new lead (Name, Email, Phone)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, email, and phone number',
      });
    }

    if (req.app.locals.isMongoConnected) {
      const newLead = await Lead.create({ name: name.trim(), email: email.trim().toLowerCase(), phone: phone.trim() });
      return res.status(201).json({
        success: true,
        message: 'Thank you! Your details have been submitted successfully.',
        data: { _id: newLead._id, name: newLead.name, createdAt: newLead.createdAt },
        source: 'mongodb',
      });
    } else {
      const fallbackLeads = getFallbackLeads();
      const newLead = {
        _id: 'lead_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        createdAt: new Date().toISOString(),
      };
      fallbackLeads.unshift(newLead);
      saveFallbackLeads(fallbackLeads);
      return res.status(201).json({
        success: true,
        message: 'Thank you! Your details have been submitted successfully.',
        data: { _id: newLead._id, name: newLead.name, createdAt: newLead.createdAt },
        source: 'local-fallback',
      });
    }
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error creating lead',
    });
  }
});

// PROTECTED (ADMIN ONLY): GET /api/leads - Get all leads from MongoDB
router.get('/', protectAdmin, async (req, res) => {
  try {
    if (req.app.locals.isMongoConnected) {
      const leads = await Lead.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: leads.length, data: leads, source: 'mongodb' });
    } else {
      const leads = getFallbackLeads().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return res.json({ success: true, count: leads.length, data: leads, source: 'local-fallback' });
    }
  } catch (error) {
    console.error('Error fetching leads:', error);
    const leads = getFallbackLeads();
    res.json({ success: true, count: leads.length, data: leads, source: 'local-fallback' });
  }
});

// PROTECTED (ADMIN ONLY): DELETE /api/leads/:id - Delete lead from MongoDB
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    if (req.app.locals.isMongoConnected) {
      const lead = await Lead.findByIdAndDelete(id);
      if (!lead) {
        let fallbackLeads = getFallbackLeads();
        const initialLen = fallbackLeads.length;
        fallbackLeads = fallbackLeads.filter((l) => l._id !== id);
        if (fallbackLeads.length < initialLen) {
          saveFallbackLeads(fallbackLeads);
          return res.json({
            success: true,
            message: 'Lead deleted successfully from storage',
            id,
          });
        }
        return res.status(404).json({ success: false, error: 'Lead not found' });
      }
      return res.json({
        success: true,
        message: 'Lead deleted successfully from MongoDB',
        id,
        data: lead,
      });
    } else {
      let fallbackLeads = getFallbackLeads();
      const initialLength = fallbackLeads.length;
      fallbackLeads = fallbackLeads.filter((l) => l._id !== id);
      if (fallbackLeads.length === initialLength) {
        return res.status(404).json({ success: false, error: 'Lead not found' });
      }
      saveFallbackLeads(fallbackLeads);
      return res.json({
        success: true,
        message: 'Lead deleted successfully',
        id,
      });
    }
  } catch (error) {
    console.error('Error deleting lead:', error);
    try {
      const { id } = req.params;
      let fallbackLeads = getFallbackLeads();
      const initialLength = fallbackLeads.length;
      fallbackLeads = fallbackLeads.filter((l) => l._id !== id);
      if (fallbackLeads.length < initialLength) {
        saveFallbackLeads(fallbackLeads);
        return res.json({
          success: true,
          message: 'Lead deleted successfully',
          id,
        });
      }
    } catch (e) {}
    res.status(500).json({ success: false, error: 'Server error deleting lead' });
  }
});

export default router;
