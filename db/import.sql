-- psql -d qa -f db/import.sql -a
\copy questions from './Data/questions.csv' csv  header;
\copy answers from './Data/answers.csv' csv  header;
\copy photos from './Data/answers_photos.csv' csv  header;
