const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const healthRoutes = require('./routes/health');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/health', healthRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

app.post('/api/auth/signup', async (req, res) => {
  try {
    // signup logic...
  } catch (error) {
    console.error("SIGNUP ERROR:", error); // <-- Add this line!
    res.status(500).json({ message: "Server error" });
  }
});

});