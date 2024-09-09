var express = require('express');
var router = express.Router();
const backend = require('../bin/lib/sharedb');

function createDoc() {
  console.log('calling to create doc')
  var connection = backend.connect();
  var doc = connection.get('documents', 'docId');
  console.log(doc)
  doc.fetch(function(err) {
    if (err) console.error(error);
    if (!doc.type) {
      doc.create({content: ''})
    }
  });
}

router.post('/createDoc', (req, res) => {
  createDoc(); 
  res.status(200).json({ message: 'Document created' });
});

module.exports = router;