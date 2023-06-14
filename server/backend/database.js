const MYSQL = require('mysql');
require('dotenv').config();

const connection = MYSQL.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
