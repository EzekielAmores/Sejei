const { inputs } = require('../data/inputs');

const getInputs = (req, res) => {
  res.json(inputs);
};

const addInput = (req, res) => {
  const { input } = req.body;
  if (input && input.trim()) {
    inputs.push(input.trim());
  }
  res.sendStatus(200);
};

module.exports = { getInputs, addInput };