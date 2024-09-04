import redis from 'redis';

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    this.client.on('error', (error) => {
      console.error(`Redis client not connected to the server: ${error.message}`);
    });

    this.client.on('connect', () => {
      console.log('Redis client connected to the server');
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (error, result) => {
        if (error) {
          console.error(`Error getting key ${key}:`, error);
          return reject(error);
        }
        resolve(result);
      });
    });
  }

  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.setex(key, duration, value, (error) => {
        if (error) {
          console.error(`Error setting key ${key}:`, error);
          return reject(error);
        }
        resolve();
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (error) => {
        if (error) {
          console.error(`Error deleting key ${key}:`, error);
          return reject(error);
        }
        resolve();
      });
    });
  }
}

const redisClient = new RedisClient();
export default redisClient;
