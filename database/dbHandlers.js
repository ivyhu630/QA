const { db } = require('.');

module.exports = {
  getQuestions: ({ product_id, page, count }) => db.query(`SELECT * FROM questions LIMIT ${count} OFFSET (${count} *(${page} - 1))`),
  getAnswers: ({ question_id, page, count }) => db.query(`
    SELECT
      id AS answer_id,
      body,
      date_written AS date,
      answerer_name,
      helpful AS helpfulness
    FROM answers
    WHERE reported = 'false' AND question_id=${question_id}
    LIMIT ${count} OFFSET (${count} *(${page} - 1))
    `),
  getPhotos: ({ answer_id }) => db.query(`
    SELECT
        id,
        url
    FROM photos
    WHERE answer_id = ${answer_id}
  `),
  getAnswersWPhoto: ({ question_id, page, count }) => db.query(`
    SELECT
      a.id AS answer_id,
      body,
      date_written AS date,
      answerer_name,
      helpful AS helpfulness,
      p.id,
      p.url
    FROM answers AS a
    INNER JOIN photos AS p
    ON a.id = p.answer_id
    WHERE reported = 'false' AND question_id=${question_id}
    LIMIT ${count} OFFSET (${count} *(${page} - 1))
  `),

};
