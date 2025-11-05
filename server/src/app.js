const express = require('express');
const cors = require('cors');
const { corsOrigin } = require('./config/env');
const ingestionRoutes = require('./routes/ingestionRoutes');

const app = express();
app.use(express.json());
app.use(cors({ origin: corsOrigin }));

// Health
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Feature routes
app.use('/api', ingestionRoutes);

module.exports = app;