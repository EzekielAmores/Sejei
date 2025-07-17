const express = require('express');
const app = express();
const PORT = 3000;

let savedInputs = [];

// app.use(express.json());
// app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/saved.html');
});

app.use(express.static('public'));

app.post('/input', (req, res) => {
  const input = req.body.input;
  if (input) savedInputs.push(input);
  res.sendStatus(200);
});

app.get('/inputs', (req, res) => {
  res.json(savedInputs);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
});