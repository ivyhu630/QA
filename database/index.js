const { Pool } = require('pg');
require('dotenv').config();
// const { InitialLoad } = require('./schema.sql');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  // port: process.env.DB_PORT,
});
const count = 2;
const page = 1;
const question_id = 36;
const answer_id = 5;

pool.connect()
  .then((client) => {
    console.log('db connected');
    return client
      .query(`

      SELECT json_build_object(
        'body', body
      )
      FROM answers AS a
      INNER JOIN photos AS p
      ON a.id = p.answer_id
      WHERE reported = 'false' AND question_id=${question_id}
      LIMIT ${count} OFFSET (${count} *(${page} - 1))

    `)
      .then((res) => {
        console.log(res);
        client.release();
      });
  })
  // .then(() => {
  //   pool.query(InitialLoad);
  // })
  .catch((err) => console.log('connection err', err));

// const res = await pool.query('SELECT $1::text as message', ['Hello world!'])
// console.log(res.rows[0].message); // Hello world!
// await pool.end();
exports.db = pool;
