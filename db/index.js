const { Pool } = require('pg');
require('dotenv').config();
// const { InitialLoad } = require('./schema.sql');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});
module.exports = {
  query: (text, params) => pool.query(text, params),
};
