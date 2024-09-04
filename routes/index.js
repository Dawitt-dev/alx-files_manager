// routes/index.js
const express = require('express');
const AppController = require('../controllers/AppController.js'); // Import the controller

const router = express.Router();

// Define routes
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

module.exports = router;
