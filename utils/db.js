import { MongoClient } from 'mongodb';

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const database = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${host}:${port}/`;

class DBClient {
  constructor() {
    this.client = null;
    this.db = null;
    this.connect();
  }

  async connect() {
    try {
      this.client = await MongoClient.connect(url, { useUnifiedTopology: true });
      this.db = this.client.db(database);
      await this.db.createCollection('users');
      await this.db.createCollection('files');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

  isAlive() {
    return !!this.db;
  }

  async nbUsers() {
    try {
      return await this.db.collection('users').countDocuments();
    } catch (error) {
      console.error('Error counting users:', error);
      return 0;
    }
  }

  async getUser(query) {
    try {
      console.log('QUERY IN DB.JS', query);
      const user = await this.db.collection('users').findOne(query);
      console.log('GET USER IN DB.JS', user);
      return user;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }

  async nbFiles() {
    try {
      return await this.db.collection('files').countDocuments();
    } catch (error) {
      console.error('Error counting files:', error);
      return 0;
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
