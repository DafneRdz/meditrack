const express = require('express');
const pool = require('../db/db');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// GET all health logs for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const logs = await pool.query(
      'SELECT * FROM health_logs WHERE user_id = $1 ORDER BY log_date DESC',
      [req.userId]
    );
    res.json(logs.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new health log
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { symptoms, heart_rate, blood_pressure_systolic, blood_pressure_diastolic, temperature, weight, notes } = req.body;

    const newLog = await pool.query(
      `INSERT INTO health_logs 
        (user_id, symptoms, heart_rate, blood_pressure_systolic, blood_pressure_diastolic, temperature, weight, notes) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [req.userId, symptoms, heart_rate, blood_pressure_systolic, blood_pressure_diastolic, temperature, weight, notes]
    );

    res.json(newLog.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;