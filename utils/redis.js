const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.connected = false;

    this.connectPromise = new Promise((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('Redis client connected to the server');
        this.connected = true;
        resolve();
      });

      this.client.on('error', (error) => {
        console.error(`Redis client not connected to the server: ${error.message}`);
        reject(error);
      });
    });
  }

  isAlive() {
    return this.connected;
  }

  async get(key) {
    await this.connectPromise; // Wait until the client is connected
    return new Promise((resolve, reject) => {
      this.client.get(key, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      });
    });
  }

  async set(key, value, duration) {
    await this.connectPromise; // Wait until the client is connected
    return new Promise((resolve, reject) => {
      this.client.setex(key, duration, value, (error) => {
        if (error) {
          return reject(error);
        }
        resolve();
      });
    });
  }

  async del(key) {
    await this.connectPromise; // Wait until the client is connected
    return new Promise((resolve, reject) => {
      this.client.del(key, (error) => {
        if (error) {
          return reject(error);
        }
        resolve();
      });
    });
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
