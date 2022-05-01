const { createClient } = require('redis');
const db = require('../db');
require('dotenv').config();

// const client = createClient({
//   url: process.env.REDIS_URL,
// });
// client.on('error', (err) => console.log('Redis Client Error', err));
// (async () => {
//   await client.connect();
// })();
module.exports = {
  listAnswers: async (req, res) => {
    const { question_id } = req.params;
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
      (async () => {
        // const answers = await client.get(question_id);
        // if (answers != null) {
        //   return res.status(200).send(JSON.parse(answers));
        // }
        const { count = 5, page = 1 } = req.query;
        const { rows } = await db.query(query, [question_id, page, count]);
        const data = rows[0] || { question_id, page, count, results: [] };
        // await client.set(question_id, JSON.stringify(data));
        return res.status(200).send(data);
      })();
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
  PostQuestions: async (req, res) => {
    const {
      product_id, body, name, email,
    } = req.body;
    const query = `
      INSERT INTO questions(product_id,body,asker_name,asker_email)
      VALUES ($1, $2, $3, $4 )
      RETURNING id
    `;
    try {
      const { rows } = await db.query(query, [product_id, body, name, email]);
      res.status(201).send(`Question inserted successfully as question id ${rows[0].id}`);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  PostAnswers: async (req, res) => {
    const { question_id } = req.params;
    const {
      body, name, email, photos,
    } = req.body;
    const query = `
      WITH a as (
        INSERT INTO answers (question_id,body,answerer_name,email)
        VALUES ($1, $2, $3, $4 )
        RETURNING id
      )
      INSERT INTO photos (answer_id, url)
      VALUES ((SELECT id FROM a), unnest($5::text[]))
      RETURNING  (answer_id, id)
    `;
    try {
      await db.query(query, [question_id, body, name, email, photos]);
      res.status(201).send('Answers and photos inserted successfully');
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  MarkQuestionHelpful: async (req, res) => {
    const { question_id } = req.params;
    const query = `
      UPDATE questions
        SET helpful = helpful + 1
      WHERE id = $1
    `;
    try {
      await db.query(query, [question_id]);
      res.status(204).send('vote success for question helpfulness');
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  ReportQuestion: async (req, res) => {
    const { question_id } = req.params;
    const query = `
      UPDATE questions
        SET reported = TRUE
      WHERE id = $1
    `;
    try {
      await db.query(query, [question_id]);
      res.status(204).send('reported question');
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  MarkAnswerHelpful: async (req, res) => {
    const { answer_id } = req.params;
    const query = `
      UPDATE answers
        SET helpful = helpful + 1
      WHERE id = $1
    `;
    try {
      await db.query(query, [answer_id]);
      res.status(204).send('vote success for answer helpfulness');
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  ReportAnswer: async (req, res) => {
    const { answer_id } = req.params;
    const query = `
      UPDATE answers
        SET reported = TRUE
      WHERE id = $1
    `;
    try {
      await db.query(query, [answer_id]);
      res.status(204).send('reported answer');
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },

};
