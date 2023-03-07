const mysql = require('mysql2');

require('dotenv').config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'employeeTracker_db'
    },
    console.log("\nConnected to the employeeTracker_db database!")
);

module.exports = db;