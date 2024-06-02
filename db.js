const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Task2',
    password: 'Ran!120304',
    port: 5432,
});

module.exports = pool;