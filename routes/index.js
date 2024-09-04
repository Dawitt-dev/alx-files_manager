// routes/index.js
const express = require('express');
const AppController = require('../controllers/AppController.js'); // Import the controller
const UsersController = require('../controllers/UsersController.js');

const router = express.Router();

// Define routes
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

// Define new route for creating a user
router.post('/users', UsersController.postNew);

module.exports = router;
