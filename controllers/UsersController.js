// controllers/UsersController.js
const crypto = require('crypto');
const dbClient = require('../utils/db'); // Import the DB client

const UsersController = {
    async postNew(req, res) {
      try {
        const { email, password } = req.body;
  
        // Check if email or password is missing
        if (!email) return res.status(400).json({ error: 'Missing email' });
        if (!password) return res.status(400).json({ error: 'Missing password' });
  
        // Check if the email already exists
        const existingUser = await dbClient.getUser({ email });
        if (existingUser) return res.status(400).json({ error: 'Already exist' });
  
        // Hash the password using SHA1
        const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');
  
        // Create the new user
        const result = await dbClient.db.collection('users').insertOne({ email, password: hashedPassword });
  
        // Return the new user with id and email
        res.status(201).json({ id: result.insertedId.toString(), email });
      } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };

    module.exports = UsersController;
