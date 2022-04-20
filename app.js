const express = require('express');

// Middleware
const db = require('./database');

const app = express();
module.exports.app = app;
app.use(express.json());

// Set what we are listening on.
app.set('port', 3000);


// Serve the client files
// app.use(express.static(`${__dirname}/../client`));

// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}
