// routes/index.js
const express = require('express');
const AppController = require('../controllers/AppController'); // Import the controller
//const UsersController = require('../controllers/UsersController');

const router = express.Router();

const routeController = (app) => {
    app.use('/', router);
  
    // App Controller
    router.get('/status', (req, res) => {
      AppController.getStatus(req, res);
    });
  
    router.get('/stats', (req, res) => {
      AppController.getStats(req, res);
    });

module.exports = router;
