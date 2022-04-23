
-- *****Get answers with no JOIN*****
-- SELECT
--   json_build_object(
--     'question', 1,
--     'page', 0,
--     'count', 5,
--     'results', results
--     )
-- FROM (
--   SELECT coalesce(json_agg(answers_rows), '[]') AS results
--   FROM (
--     SELECT
--       a.id AS answer_id,
--       body,
--       date_written AS date,
--       answerer_name,
--       helpful AS helpfulness, (
--       SELECT coalesce(json_agg(photos_rows), '[]') AS photos
--       FROM (
--         SELECT
--           id,
--           url
--         FROM photos
--         WHERE answer_id = a.id
--         ) AS photos_rows
--       )
--     FROM answers AS a WHERE question_id=888
--   ) AS answers_rows
-- ) AS _unused_



-- *****GET Questions with no JOIN*****
-- SELECT
--   json_build_object(
--     'product_id', 5,
--     'results', results
--     )
-- FROM
--   (
--   SELECT coalesce(json_agg(question_rows), '[]') AS results
--   FROM (
--     SELECT
--       q.id AS question_id,
--       body AS question_body,
--       date_written AS question_date,
--       asker_name,
--       helpful AS question_helpfulness,
--       reported,
--       (
--         SELECT
--           jsonb_object_agg(
--             id, answers
--           ) AS answers
--         FROM (
--           SELECT
--             a.id,
--             body,
--             date_written AS date,
--             answerer_name,
--             helpful AS helpfulness, (
--             SELECT coalesce(json_agg(photos_rows), '[]') AS photos
--             FROM (
--               SELECT
--                 id,
--                 url
--               FROM photos
--               WHERE answer_id = a.id
--               ) AS photos_rows
--             )
--           FROM answers AS a
--           WHERE question_id=q.id
--           LIMIT 2
--         ) AS answers
--       )
--     FROM questions AS q
--     WHERE q.product_id=5
--   ) AS question_rows
--   ) AS _unused_

-- ****GET answers using JOIN*****
-- WITH result_rows AS (
-- 	SELECT
-- 		a.id AS answer_id,
-- 		body,
-- 		date_written AS date,
-- 		answerer_name,
-- 		helpful AS helpfulness,
-- 		coalesce(
-- 		json_agg(
-- 			json_build_object('id', p.id, 'url', p.url)
-- 		) FILTER (WHERE p.id IS NOT NULL), '[]'
-- 		) AS photos
-- 	FROM answers a
-- 	LEFT JOIN photos p ON a.id=p.answer_id
-- 	WHERE a.question_id=1
-- 	GROUP BY a.id
-- )
-- SELECT json_build_object(
-- 	'question', 1,
-- 	'page', 0,
-- 	'count', 5,
-- 	'results', json_agg(
-- 		json_build_object(
-- 			'answer_id', answer_id,
-- 			'body', body,
-- 			'date', date,
-- 			'answerer_name', answerer_name,
-- 			'helpfulness', helpfulness,
-- 			'photos', photos
-- 		)
-- 	)
-- ) AS results
-- FROM result_rows

--  GET QuestionList usig JOIN
-- WITH raw_rows AS
-- (
-- 	SELECT
-- 		q.id AS question_id,
-- 		q.body AS question,
-- 		a.id AS answer_id,
-- 		a.body AS answer,
-- 		p.id AS photo_id,
-- 		p.url AS photo_url
-- 	FROM questions q
-- 	LEFT JOIN answers a on q.id = a.question_id
-- 	LEFT JOIN photos p on a.id = p.answer_id
-- 	WHERE q.product_id = 1
-- ),
-- answer_rows AS
-- (
-- 	SELECT
-- 		question_id,
-- 		question,
-- 		answer_id,
-- 		answer,
-- 		coalesce(json_agg(
-- 			json_build_object(
-- 				'id', photo_id,
-- 				'url', photo_url
-- 			)
-- 		) FILTER (WHERE photo_id IS NOT NULL), '[]') AS photos
-- 	FROM raw_rows
-- 	GROUP BY question_id, question, answer_id, answer
-- ),
-- limited_rows AS
-- (
-- 	SELECT partitioned.* FROM
-- 	(
-- 		SELECT ROW_NUMBER() OVER (PARTITION BY question_id ORDER BY answer_id) AS r, t.* FROM answer_rows t
-- 	) partitioned WHERE partitioned.r <= 2
-- ),
-- agg_row AS
-- (
-- 	SELECT
-- 		a.question_id,
-- 		a.question,
-- 		coalesce(json_object_agg(
-- 			a.answer_id,
-- 			json_build_object(
-- 				'id', a.answer_id::INT,
-- 				'body', a.answer,
-- 				'photos', a.photos
-- 			)
-- 		) FILTER (WHERE a.answer_id IS NOT NULL), '{}') AS answers
-- 	FROM limited_rows a
-- 	GROUP BY a.question_id, a.question
-- )
-- SELECT json_build_object(
-- 	'product_id', 5,
-- 	'results', json_agg(row_to_json(agg_row))
-- )
-- FROM agg_row

