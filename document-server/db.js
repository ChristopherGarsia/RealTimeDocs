const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017'; // MongoDB connection string
const dbName = 'users'; // Database name

let db = null;

// Connect to MongoDB
const connectToDb = async () => {
  if (db) return db; // Return existing connection if available

  try {
    const client = await MongoClient.connect(url);
    db = client.db(dbName);
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

module.exports = connectToDb;