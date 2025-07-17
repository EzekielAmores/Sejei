const express = require('express');
const path = require('path');
const inputsRoute = require('./routes/inputs');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Static frontend
app.use(express.static(path.join(__dirname, '../frontend/public')));

// API routes
app.use('/api/inputs', inputsRoute);

// Default route (optional override)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/saved.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
});