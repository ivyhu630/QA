require('dotenv').config();
const express = require('express');
const path = require('path');
// eslint-disable-next-line import/extensions
const { getQuestions } = require('../database/dbHandlers.js')

const app = express();
module.exports.app = app;
app.use(express.json());
// Serve the client files
// app.use(express.static(path.join(__dirname, "../client/dist")));

app.get('/qa/questions', (req, res) => {
  const { } = req;
  return getQuestions()

});


app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
