const express = require('express');
const bcrypt = require('bcrypt');
const connectToDb = require('../db');
const router = express.Router();
const { ObjectId } = require('mongodb');

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, error: 'Username and password are required' });
  }

  try {
    const db = await connectToDb();
    const usersCollection = db.collection('users');

    const existingUser = await usersCollection.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ success: false, error: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      password: hashedPassword,
    };

    await usersCollection.insertOne(newUser);

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
  
    try {
      const db = await connectToDb();
      const usersCollection = db.collection('users');
  
      const user = await usersCollection.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid username or password' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid username or password' });
      }
  
      res.status(200).json({ success: true, message: 'Login successful', userId: user._id });
  
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
  });

router.get('/documents/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
      const db = await connectToDb();
      const usersCollection = db.collection('users');
  
      const user = await usersCollection.findOne({ _id: ObjectId(userId) });
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      const documents = user.AccessibleDocs || {};
  
      return res.status(200).json({ success: true, documents });
    } catch (err) {
      console.error('Error retrieving docs for user:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
  

module.exports = router;
