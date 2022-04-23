-- psql -d qa -f db/schema.sql -a

DROP DATABASE IF EXISTS qa;
CREATE DATABASE qa;
-- CONNECT qa;

DROP TABLE IF EXISTS Questions;

CREATE TABLE Questions (
  id SERIAL,
  product_id INT,
  body TEXT NOT NULL,
  date_written BIGINT,
  asker_name VARCHAR(100) NOT NULL,
  asker_email VARCHAR(100) NOT NULL,
  reported BOOLEAN DEFAULT FALSE,
  helpful INTEGER DEFAULT 0,
  PRIMARY KEY (id)
);


DROP TABLE IF EXISTS Answers;

CREATE TABLE Answers (
  id SERIAL,
  question_id INTEGER,
  body TEXT NOT NULL,
  date_written BIGINT,
  answerer_name VARCHAR(100),
  email VARCHAR(100),
  reported BOOLEAN DEFAULT FALSE,
  helpful INTEGER DEFAULT 0,
  PRIMARY KEY (id)
);


DROP TABLE IF EXISTS Photos;

CREATE TABLE Photos (
  id SERIAL,
  answer_id INTEGER,
  url VARCHAR(1000),
  PRIMARY KEY (id)
);




-- ---
-- Test Data
-- ---

-- INSERT INTO QuestionList (id,product_id) VALUES
-- ('','');
-- INSERT INTO AnswerList (id,question_id) VALUES
-- ('','');
-- INSERT INTO Questions (id,question_body,question_date,asker_name,question_helpfulness,reported,email) VALUES
-- ('','','','','','','');
-- INSERT INTO Answers (id,body,date,answerer_name,helpfulness,email,reported) VALUES
-- ('','','','','','','');
-- INSERT INTO Photos (id,url,answer_id) VALUES
-- ('','','');

