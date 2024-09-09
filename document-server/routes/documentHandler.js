var express = require('express');
var router = express.Router();
const backend = require('../bin/lib/sharedb');

function createDoc(username, docId) {
  var connection = backend.connect();
  var doc = connection.get(username, docId);
  doc.fetch(function(err) {
    if (err) console.error(error);
    if (!doc.type) {
      doc.create({content: ''})
    }
  });
}

router.post('/createDoc', (req, res) => {
  const { username, docId } = req.body;

  createDoc(username, docId);

  res.status(200).json({ message: 'Document created' });
});

module.exports = router;