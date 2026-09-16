const express = require('express');
const pool = require('../db/db');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// GET all health logs for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    // Ensure userId is extracted regardless of how authMiddleware attaches it
    const userId = req.userId || req.user?.id || req.user?.userId;

    const logs = await pool.query(
      'SELECT * FROM health_logs WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    res.json(logs.rows);
  } catch (err) {
    console.error('GET /api/health error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new health log
router.post('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId || req.user?.id || req.user?.userId;
    const { symptoms, heart_rate, blood_pressure_systolic, blood_pressure_diastolic, temperature, weight, notes } = req.body;

    const newLog = await pool.query(
      `INSERT INTO health_logs 
        (user_id, symptoms, heart_rate, blood_pressure_systolic, blood_pressure_diastolic, temperature, weight, notes) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [userId, symptoms, heart_rate, blood_pressure_systolic, blood_pressure_diastolic, temperature, weight, notes]
    );

    res.json(newLog.rows[0]);
  } catch (err) {
    console.error('POST /api/health error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;