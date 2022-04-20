ALTER TABLE Answers ADD FOREIGN KEY (question_id) REFERENCES Questions (id);
ALTER TABLE Photos ADD FOREIGN KEY (answer_id) REFERENCES Answers (id);
