const express = require('express');
const AppController = require('../controllers/AppController'); // Import the controller
const UsersController = require('../controllers/UsersController');
const AuthController = require('../controllers/AuthController');
const FilesController = require('../controllers/FilesController'); // Import the missing module

// routes/index.js

const router = express.Router();

// Remove the unused routeController function
app.use('/', router);

// App Controller
router.get('/status', (req, res) => {
    AppController.getStatus(req, res);
});

router.get('/stats', (req, res) => {
    AppController.getStats(req, res);
});

router.post('/users', (req, res) => {
    UsersController.postNew(req, res);
});

router.get('/connect', (req, res) => {
    AuthController.getConnect(req, res);
});

router.get('/disconnect', (req, res) => {
    AuthController.getDisconnect(req, res);
});

router.get('/users/me', (req, res) => {
    UsersController.getMe(req, res);
});

router.post('/files', (req, res) => {
    FilesController.postUpload(req, res);
});

router.get('/files/:id', (req, res) => {
    FilesController.getShow(req, res);
});

router.get('/files', (req, res) => {
    FilesController.getIndex(req, res);
});

router.put('/files/:id/publish', (req, res) => {
    FilesController.putPublish(req, res);
});

router.put('/files/:id/unpublish', (req, res) => {
    FilesController.putUnpublish(req, res);
});

router.post('/files/:id/data', (req, res) => {
    FilesController.getFile(req, res);
});

module.exports = router;
