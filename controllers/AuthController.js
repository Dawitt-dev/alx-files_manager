const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const dbClient = require('../utils/db.js');
const redisClient = require('../utils/redis.js');

const AuthController = {
    async getConnect(req, res) {
        try {
            // Extract and decode Basic Auth header
            const authHeader = req.headers.authorization || '';
            const [scheme, credentials] = authHeader.split(' ');
            if (scheme !== 'Basic' || !credentials) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const [email, password] = Buffer.from(credentials, 'base64').toString().split(':');
            if (!email || !password) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            // Hash password and find user
            const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');
            const user = await dbClient.getUser({ email, password: hashedPassword });
            if (!user) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            // Generate and store token
            const token = uuidv4();
            await redisClient.set(`auth_${token}`, user._id.toString(), 'EX', 86400); // 24 hours expiration

            res.status(200).json({ token });
        } catch (error) {
            console.error('Error during connection:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async getDisconnect(req, res) {
        try {
            const token = req.headers['x-token'];
            if (!token) return res.status(401).json({ error: 'Unauthorized' });

            const result = await redisClient.del(`auth_${token}`);
            if (result === 0) return res.status(401).json({ error: 'Unauthorized' });

            res.status(204).send();
        } catch (error) {
            console.error('Error during disconnection:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = AuthController;
