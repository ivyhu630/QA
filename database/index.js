const { Client } = require('pg');
require('dotenv').config();
// const { InitialLoad } = require('./schema.sql');

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  // port: process.env.DB_PORT,
});
client.connect()
  .then(() => {
    console.log('db connected');
  })
  // .then(() => {
  //   client.query(InitialLoad);
  // })
  .catch((err) => console.log('connection err', err))
;

// const res = await client.query('SELECT $1::text as message', ['Hello world!'])
// console.log(res.rows[0].message); // Hello world!
// await client.end();
exports.db = client;
