require('dotenv').config();
const express = require('express');
const cors = require('cors');

const models = require('./models.js');
// eslint-disable-next-line import/extensions

const app = express();
app.use(cors());

module.exports.app = app;
app.use(express.json());

app.get('/qa/questions/:question_id/answers', models.listAnswers);
app.get('/qa/questions', models.ListQuestions);
app.post('/qa/questions', models.PostQuestions);
app.post('/qa/questions/:question_id/answers', models.PostAnswers);
app.put('/qa/questions/:question_id/helpful', models.MarkQuestionHelpful);
app.put('/qa/questions/:question_id/report', models.ReportQuestion);
app.put('/qa/answers/:answer_id/helpful', models.MarkAnswerHelpful);
app.put('/qa/answers/:answer_id/report', models.ReportAnswer);
app.get(`/${process.env.loader_token}/`, (req, res) => {
  res.send(`${process.env.loader_token}`);
});
app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
