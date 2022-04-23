ALTER TABLE Answers ADD FOREIGN KEY (question_id) REFERENCES Questions (id);
ALTER TABLE Photos ADD FOREIGN KEY (answer_id) REFERENCES Answers (id);


ALTER TABLE Questions
ALTER COLUMN date_written SET DATA TYPE timestamp without time zone
USING timestamp without time zone 'epoch' + (date_written / 1000 ) * interval '1 second';
ALTER TABLE Answers
ALTER COLUMN date_written SET DATA TYPE timestamp without time zone
USING timestamp without time zone 'epoch' + (date_written / 1000 ) * interval '1 second';


SELECT setval('questions_id_seq', (SELECT MAX(id) FROM questions)+1);
SELECT setval('answers_id_seq', (SELECT MAX(id) FROM answers)+1);
SELECT setval('photos_id_seq', (SELECT MAX(id) FROM photos)+1);

ALTER TABLE answers ALTER column date_written set default current_timestamp;
ALTER TABLE questions ALTER column date_written set default current_timestamp;
