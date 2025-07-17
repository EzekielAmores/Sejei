const express = require('express');
const router = express.Router();
const { getInputs, addInput } = require('../controllers/inputsController');

router.get('/', getInputs);
router.post('/', addInput);

module.exports = router;