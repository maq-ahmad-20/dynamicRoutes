const mysql = require('mysql2');

const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    database : 'node-complete',
    password :'M1q2ool@hmad'
});

module.exports = pool.promise()