var express = require('express');
var router = express.Router();
const backend = require('../sharedb');
const connectToDb = require('../db');
const { ObjectId } = require('mongodb');

async function createDoc(userId, docId) {
  try {
    const [shareDbResult, mongoDbResult] = await Promise.all([
      addDocToShareDb(userId, docId),
      addDocToMongoDb(userId, docId),
    ]);

    if (!shareDbResult.success) {
      return { success: false, message: shareDbResult.message };
    }

    if (!mongoDbResult.success) {
      return { success: false, message: mongoDbResult.message };
    }

    return { success: true, message: 'Document created successfully' };
  } catch (error) {
    console.error('Error in createDoc:', error);
    return { success: false, message: 'An error occurred while creating the document' };
  }
}

async function addDocToShareDb(userId, docId) {
  return new Promise((resolve, reject) => {
    var connection = backend.connect();
    var doc = connection.get(userId, docId);
    doc.fetch(function (err) {
      if (err) {
        console.error('Error adding doc to ShareDB:', err);
        resolve({ success: false, message: 'Error adding doc for syncing' });
        return;
      }
      if (!doc.type) {
        doc.create({ content: '' }, function (err) {
          if (err) {
            console.error('Error creating document in ShareDB:', err);
            resolve({ success: false, message: 'Error creating document in ShareDB' });
          } else {
            resolve({ success: true, message: 'Doc is synced' });
          }
        });
      } else {
        resolve({ success: true, message: 'Doc already exists and is synced' });
      }
    });
  });
}

async function addDocToMongoDb(userId, docId) {
  const db = await connectToDb();
  const usersCollection = db.collection('users');

  try {
    const user = await usersCollection.findOne({ _id: ObjectId(userId) });

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    const update = {
      $set: {
        [`AccessibleDocs.${docId}`]: userId,
      },
    };

    await usersCollection.updateOne({ _id: ObjectId(userId) }, update);
    return { success: true, message: 'Document added to user' };
  } catch (err) {
    console.error('Error updating MongoDB:', err);
    return { success: false, message: 'Error updating user in MongoDB' };
  }
}

router.post('/create', async (req, res) => {
  const { userId, docId } = req.body;

  if (!userId) {
    console.error('user id not present')
    res.status(400).json({ success:false, message: 'user id not present' })
  } else if (!docId) {
    console.error('doc id not present')
    res.status(400).json({ success:false, message: 'doc id not present' })
  } else {
    const result = await createDoc(userId, docId);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  }
});

router.post('/share', async (req, res) => {
  const { docId, docSpaceId, targetUsername } = req.body;

  try {
    const db = await connectToDb();
    const usersCollection = db.collection('users');

    const targetUser = await usersCollection.findOne({ username: targetUsername });
    
    if (!targetUser) {
      return res.status(404).json({ success: false, message: 'Target user not found' });
    }

    const update = {
      $set: {
        [`AccessibleDocs.${docId}`]: docSpaceId,
      }
    };

    await usersCollection.updateOne({ _id: ObjectId(targetUser._id) }, update);

    return res.status(200).json({ success: true, message: 'Document shared successfully' });

  } catch (error) {
    console.error('Error sharing document:', error);
    return res.status(500).json({ success: false, message: 'Error sharing document' });
  }
});

module.exports = router;