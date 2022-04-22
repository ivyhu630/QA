const db = require('../db');

module.exports = {
  listAnswers: async (req, res) => {
    const { question_id } = req.params;
    let { count = 5, page = 1 } = req.query;
    const limit = 3;
    const query = `
      SELECT
        a.question_id::TEXT as question,
        $2::INTEGER as page,
        $3::INTEGER as count,
        json_agg(
          json_build_object(
            'answer_id', id,
            'body', body,
            'date', date_written,
            'answerer_name', answerer_name,
            'helpfulness', helpful,
            'photos', (
              SELECT coalesce(json_agg(photos), '[]')
              FROM (
                SELECT id, url
                FROM photos p
                WHERE p.answer_id = a.id
              ) as photos
            )
          )
        ) as results
      FROM (
        SELECT *
        FROM answers
        WHERE question_id = $1
          AND reported = false
        LIMIT $3
      ) as a
      GROUP BY 1
    `;
    try {
      const { rows } = await db.query(query, [question_id, page, count]);
      res.status(200).send(rows);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  ListQuestions: async (req, res) => {
    const { question_id } = req.params;
    let { count = 5, page = 1 } = req.query;
    const limit = 3;
    const query = `
      SELECT
        a.question_id::TEXT as question,
        $2::INTEGER as page,
        $3::INTEGER as count,
        json_agg(
          json_build_object(
            'answer_id', id,
            'body', body,
            'date', date_written,
            'answerer_name', answerer_name,
            'helpfulness', helpful,
            'photos', (
              SELECT coalesce(json_agg(photos), '[]')
              FROM (
                SELECT id, url
                FROM photos p
                WHERE p.answer_id = a.id
              ) as photos
            )
          )
        ) as results
      FROM (
        SELECT *
        FROM answers
        WHERE question_id = $1
          AND reported = false
        LIMIT $3
      ) as a
      GROUP BY 1
    `;
    try {
      const { rows } = await db.query(query, [question_id, page, count]);
      res.status(200).send(rows);
    } catch (err) {
      res.status(500).send(err);
    }
  },

};