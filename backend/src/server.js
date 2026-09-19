const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'EventHub API running successfully', timestamp: new Date() });
});

// Root fallback
app.get('/', (req, res) => {
  res.send('EventHub REST API Server');
});

// Start Server
app.listen(PORT, () => {
  console.log(`[Server] EventHub Backend running on http://localhost:${PORT}`);
});
