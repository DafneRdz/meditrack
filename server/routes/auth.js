const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db/db');

const fs = require('fs');
const path = require('path'); //Add this line

//Create an absolute path to 'users.json' in the exact same folder as this JS file
const jsonPath = path.join(__dirname, 'users.json');

//Read from the file
const data = fs.readFileSync(jsonPath, 'utf8');

//Write to the file
fs.writeFileSync(jsonPath, JSON.stringify(useSyncExternalStore, null, 2));

// Navigates into the 'data' subfolder
const jsonPath = path.join(__dirname, 'data', 'users.json');
const router = express.Router();

// Moves up one directory '..' then accesses users.json
const jsonPath = path.join(__dirname, '..', 'users.json');

// SIGNUP
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

app.post('/api/auth/signup', async (req, res) => {
  try {
    // signup logic...
  } catch (error) {
    console.error("SIGNUP ERROR:", error); // <-- Add this line!
    res.status(500).json({ message: "Server error" });
  }
});

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );



    // Create a token
    const token = jwt.sign({ userId: newUser.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ user: newUser.rows[0], token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      user: { id: user.rows[0].id, name: user.rows[0].name, email: user.rows[0].email },
      token
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;