const Router = require('express-promise-router');
const db = require('../db');

const router = new Router();

module.exports = router;
router.get('/qa/questions/:question_id/answers', async (req, res) => {
  const { question_id } = req.params;
  const { page } = req.query || 1;
  const { count } = req.query || 5;

  const query = `
    SELECT
      $1 AS question,
      $2 AS page,
      $3 AS count,
      json_agg(
        json_build_object(
          'id', id,
          'date, date_written,
          'answerer_name', answerer_name,
          'helpfulness', helpful,
          'photo', (
            SELECT coalesce(json_agg(photos_rows), '[]') AS photos
            FROM (
              SELECT
                id,
                url
              FROM photos
              WHERE answer_id = a.id
              ) AS photos_rows
          )
  `;
  const { rows } = await db.query(query, [question_id, page, count]);
  console.log(rows[0]);
  res.send(rows[0]);
});
