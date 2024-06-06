const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'mercury',
    multipleStatements: true
});

module.exports = connection