const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const healthRoutes = require('./routes/health');

const app = express();
// Log EVERY incoming request to Render logs
app.use((req, res, next) => {
  console.log(`[REQUEST] ${req.method} ${req.url}`);
  next();
});

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/health', healthRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

app.post('/api/auth/signup', async (req, res) => {
  console.log("Signup payload received:", req.body); // Check incoming data
  try {
    // ... your signup logic ...
  } catch (error) {
    console.error("FULL SIGNUP ERROR:", error.message); // Print specific error string
    console.error(error.stack); // Print full stack trace
    res.status(500).json({ error: error.message });
  }
});

});