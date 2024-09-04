// server.js
const express = require('express');
const routes = require('./routes/index'); // Import routes

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // To parse JSON bodies

// Load routes
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
