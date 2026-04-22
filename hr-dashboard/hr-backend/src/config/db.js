const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hiring_portal',
  password: 'fullmoon',
  port: 5432,
});

module.exports = pool;
