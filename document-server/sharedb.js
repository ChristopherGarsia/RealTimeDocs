const ShareDB = require('sharedb');
const db = require('sharedb-mongo')('mongodb://localhost:27017');
const backend = new ShareDB({db});


module.exports = backend;