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
    SELECT json_agg(photos)
    FROM (
      SELECT
      id,
      url
      FROM photos
      WHERE answer_id = 5
      ) AS photos
  `),
  getAnswersList: ({ question_id, page, count }) => db.query(`
  SELECT
    json_build_object(
      'question', ${question_id},
      'page', ${page},
      'count', ${count},
      'results', results
      )
  FROM (
    SELECT coalesce(json_agg(answers_rows), '[]') AS results
    FROM (
      SELECT
        a.id AS answer_id,
        body,
        date_written AS date,
        answerer_name,
        helpful AS helpfulness, (
        SELECT coalesce(json_agg(photos_rows), '[]') AS photos
        FROM (
          SELECT
            id,
            url
          FROM photos
          WHERE answer_id = a.id
          ) AS photos_rows
        )
      FROM answers AS a
      WHERE reported = 'false' AND question_id=${question_id}
      LIMIT ${count} OFFSET (${count} *(${page} - 1))
    ) AS answers_rows
  ) AS _unused_
  `),

};
