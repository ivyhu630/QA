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

CREATE INDEX product_id_idx ON questions (product_id);
CREATE INDEX question_id_idx ON questions (id);
CREATE INDEX photoAnswer_id_idx ON photos (answer_id);
CREATE INDEX reported_question_idx ON questions (reported);
CREATE INDEX reported_answers_idx ON answers (reported);
CREATE INDEX answer_id_idx ON answers (id);
CREATE INDEX answer_question_id_idx ON answers (question_id);