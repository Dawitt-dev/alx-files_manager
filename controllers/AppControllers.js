// controllers/AppController.js
const redisClient = require('../utils/redisClient'); // Import the Redis client
const dbClient = require('../utils/dbClient'); // Import the DB client (use appropriate DB client module)

const AppController = {
  async getStatus(req, res) {
    try {
      // Check Redis and DB connectivity
      const redisStatus = await redisClient.pingAsync() === 'PONG';
      const dbStatus = await dbClient.ping(); // Example, replace with actual DB status check

      res.status(200).json({ redis: redisStatus, db: dbStatus });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async getStats(req, res) {
    try {
      // Get user and file counts from the DB
      const db = await dbClient.connect();
      const usersCount = await db.collection('users').countDocuments();
      const filesCount = await db.collection('files').countDocuments();

      res.status(200).json({ users: usersCount, files: filesCount });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports = AppController;
