const db = require('../db');

module.exports = {
  listAnswers: async (req, res) => {
    const { question_id } = req.params;
    const { count = 5, page = 1 } = req.query;
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
      res.status(200).send(rows[0]);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  ListQuestions: async (req, res) => {
    const { product_id, page = 1, count = 5 } = req.query;
    const query = `
      SELECT
      q.product_id::TEXT,
      json_agg(
        json_build_object(
          'question_id', id,
          'question_body', body,
          'question_date', date_written,
          'asker_name', asker_name,
          'question_helpfulness', helpful,
          'reported', reported,
          'answers', (
            SELECT coalesce(json_object_agg(
              id,
              json_build_object(
                'id', id,
                'body', body,
                'date', date,
                'answerer_name', answerer_name,
                'helpfulness', helpfulness,
                'photos', photos
              )
            ),'{}') AS result
            FROM (
              SELECT
                id,
                body,
                date_written AS date,
                answerer_name,
                helpful AS helpfulness,
                (
                  SELECT coalesce(json_agg(photos), '[]') AS photos
                    FROM (
                      SELECT id, url
                      FROM photos p
                      WHERE p.answer_id = a.id
                    ) AS photos)
              FROM answers a
              WHERE a.question_id = q.id
                AND reported = false
              LIMIT 2
              ) AS answers
          )
        )
      ) as results
      FROM (
      SELECT *
      FROM questions
      WHERE product_id = $1
        AND reported = false
      LIMIT $2
      ) as q
      GROUP BY 1
      `;
    try {
      const { rows } = await db.query(query, [product_id, count]);
      res.status(200).send(rows[0]);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },

};

