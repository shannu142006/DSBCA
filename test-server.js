const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Simple health check
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'DSBCA Backend API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Simple test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true,
    message: 'Backend is working correctly!'
  });
});

app.listen(PORT, () => {
  console.log(`Test backend server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT}/api/health to check status`);
});
