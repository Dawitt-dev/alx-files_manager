const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.connected = false;

    // Handle connection events
    this.client.on('connect', () => {
      console.log('Redis client connected to the server');
      this.connected = true;
    });

    this.client.on('error', (error) => {
      console.error(`Redis client not connected to the server: ${error.message}`);
    });

    // Ensure the client is connected before performing operations
    this.ensureConnection = new Promise((resolve) => {
      this.client.on('connect', () => {
        this.connected = true;
        resolve();
      });
    });
  }

  isAlive() {
    return this.connected;
  }

  async get(key) {
    await this.ensureConnection; // Ensure connection is established
    return new Promise((resolve, reject) => {
      this.client.get(key, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }

  async set(key, value, duration) {
    await this.ensureConnection; // Ensure connection is established
    return new Promise((resolve, reject) => {
      this.client.setex(key, duration, value, (error) => {
        if (error) return reject(error);
        resolve();
      });
    });
  }

  async del(key) {
    await this.ensureConnection; // Ensure connection is established
    return new Promise((resolve, reject) => {
      this.client.del(key, (error) => {
        if (error) return reject(error);
        resolve();
      });
    });
  }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
module.exports = redisClient;
