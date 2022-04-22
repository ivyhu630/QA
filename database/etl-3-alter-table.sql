-- ALTER TABLE Answers ADD FOREIGN KEY (question_id) REFERENCES Questions (id);
-- ALTER TABLE Photos ADD FOREIGN KEY (answer_id) REFERENCES Answers (id);


ALTER TABLE Questions
ALTER COLUMN date_written SET DATA TYPE timestamp without time zone
USING timestamp without time zone 'epoch' + (date_written / 1000 ) * interval '1 second';
ALTER TABLE Answers
ALTER COLUMN date_written SET DATA TYPE timestamp without time zone
USING timestamp without time zone 'epoch' + (date_written / 1000 ) * interval '1 second';