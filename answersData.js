const fs = require('fs');
const path = require('path');
const { parse } = require('fast-csv');

const rows = [];

fs.createReadStream(path.resolve('./Data/', 'answers.csv'))
  .pipe(parse({
    headers: true,
  }))
  .on('error', (error) => console.error(error))
  .on('data', (row) => {
    // console.log(row);
    // each row can be written to db
    INSERT INTO Answers (id,body,date,answerer_name,helpfulness,email,reported) VALUES
    ('','','','','','','');
    rows.push(row);
  })
  .on('end', (rowCount) => {
    console.log(`Parsed ${rowCount} rows`);
    console.log(rows[10].postcode); // this data can be used to write to a db in bulk
  });
