-- TEST FOR LOCAL QUERY TIME ----
-- Run in psql shell
--  \i db/test.sql

---------------------------------------
-- HELPER FUNCTION GENERATE RANDOM NUM
---------------------------------------
-- select count (distinct id) from questions;  3518975
-- select count (distinct product_id) from questions;899855
-- photos: 2063766

CREATE OR REPLACE FUNCTION random_between(low INT ,high INT)
   RETURNS INT AS
$$
BEGIN
   RETURN floor(random()* (high-low + 1) + low);
END;
$$ language 'plpgsql' STRICT;
------------------------
-- TEST GET QUESTION
------------------------
EXPLAIN ANALYZE SELECT
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
  WHERE product_id = (SELECT random_between(0, 899855))
    AND reported = false
  LIMIT 5
) as q
GROUP BY 1;

------------------------
-- TEST GET ANSWER
------------------------
EXPLAIN ANALYZE SELECT
  a.question_id::TEXT as question,
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
  WHERE question_id = (SELECT random_between(0, 3518975))
    AND reported = false
  LIMIT 5
) as a
GROUP BY 1;
---------------------------
-- TEST POST QUESTION ----
---------------------------
EXPLAIN ANALYZE INSERT INTO questions (product_id, body, asker_name, asker_email)
VALUES ((SELECT random_between(0, 899855)), 'Test question body', 'Tester', 'test@gmail.com');

---------------------------
-- TEST POST ANSWER ----
---------------------------
EXPLAIN ANALYZE
WITH a as (
        INSERT INTO answers (question_id,body,answerer_name,email)
        VALUES ((SELECT random_between(0, 3518975)), 'Test answer body', 'Tester', 'test@gmail.com')
        RETURNING id
      )
      INSERT INTO photos (answer_id, url)
      VALUES ((SELECT id FROM a), unnest(ARRAY['https://images.unsplash.com/photo-1511127088257-53ccfcc769fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80']))
      RETURNING  (answer_id, id);

