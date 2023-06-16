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
    console.log("Opened connection to database successfully.");
});


//PROVIDER FUNCTIONS
async function insertProvider(data){

    let query = `INSERT INTO ${process.env.DB_NAME}.proveedores (nombre, telefono, email) VALUES (` + MYSQL.escape(data.name) + ',' + MYSQL.escape(data.phone) + ',' + MYSQL.escape(data.email) +')';
    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);
    });

}

module.exports = { insertProvider };