// server.js
const express = require('express');
const routes = require('./routes/index'); // Import routes

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // To parse JSON bodies

controllerRouting(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
