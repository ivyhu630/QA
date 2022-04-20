CREATE DATABASE qa;

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;


DROP TABLE IF EXISTS QuestionList;

CREATE TABLE QuestionList (
  id SERIAL,
  product_id INTEGER NOT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS Questions;

CREATE TABLE Questions (
  id SERIAL,
  question_body MEDIUMTEXT NULL,
  question_date DATETIME NULL,
  asker_name VARCHAR NULL,
  question_helpfulness INTEGER NULL,
  reported boolean ,
  email VARCHAR NULL,
  PRIMARY KEY (id)
);


DROP TABLE IF EXISTS Answers;

CREATE TABLE Answers (
  id SERIAL,
  question_id BIGINT,
  body TEXT NOT NULL,
  date_written BIGINT,
  answerer_name VARCHAR(20),
  email VARCHAR(20),
  reported INTEGER CHECK (reported >= 0),
  helpful INTEGER CHECK (helpful >= 0),
  PRIMARY KEY (id)
);


DROP TABLE IF EXISTS Photos;

CREATE TABLE Photos (
  id INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  url VARCHAR NULL DEFAULT NULL,
  answer_id INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE AnswerList ADD FOREIGN KEY (question_id) REFERENCES QuestionList (id);
ALTER TABLE Questions ADD FOREIGN KEY (id) REFERENCES QuestionList (id);
ALTER TABLE Answers ADD FOREIGN KEY (id) REFERENCES AnswerList (id);
ALTER TABLE Photos ADD FOREIGN KEY (answer_id) REFERENCES Answers (id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE QuestionList ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE AnswerList ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Questions ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Answers ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Photos ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

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