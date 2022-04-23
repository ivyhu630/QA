require('dotenv').config();
const express = require('express');
const models = require('./models.js');
// eslint-disable-next-line import/extensions

const app = express();
module.exports.app = app;
app.use(express.json());

app.get('/qa/questions/:question_id/answers', models.listAnswers);
app.get('/qa/questions', models.ListQuestions);
app.post('/qa/questions', models.PostQuestions);
app.post('/qa/questions/:question_id/answers', models.PostAnswers);

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
