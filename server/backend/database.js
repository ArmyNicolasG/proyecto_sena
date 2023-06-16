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

//This function receives the table of the name and an Object where keys are the fields of the table and values are the data.
const insertIntoTable = (table, values) => {
    
    let query = `INSERT INTO ${process.env.DB_NAME}.${table} SET`;
    for (const [field, value] of Object.entries(values)) {
        query += ` ${MYSQL.escape(field)} = ${MYSQL.escape(value)},`;
    }
    query.slice(0, -1);

    connection.query(query, (err) => { if (err) throw err; });
}

/*
    table(String): Name of the table which you want to select data from.
    fields(Array:String): The fields where you want to select data from.
    conditions(Object): WHERE statement. Keys of the object are the conditioned fields, and its key-pair value are the data of the condition (when it's equal to (=) only).
*/
async function selectFromTable(table, fields, conditions){

    let query = `SELECT ${fields.join(', ')} FROM ${process.env.DB_NAME}.${table} WHERE`;
    if(conditions && table && fields){
        for (const [field, value] of Object.entries(conditions)) {
            query += ` ${field} = ${MYSQL.escape(value)},`;
        }
        query = query.slice(0, -1);
    }
    else if(table && fields){ query = `SELECT ${fields.join(', ')} WHERE ${process.env.DB_NAME}.${table}` }
    else{ console.error("Missing parameters on query."); return; }
    console.log(query);
    try {
        const results = await new Promise((resolve, reject) => {
          connection.query(query, (err, result) => {
                if (err) { reject(err); } 
                else { resolve(result); }
            });
        });
        
        return results;
        
      } catch (err) { throw err; }
}

function updateTable(table, fields, conditions){

    query = `UPDATE ${process.env.DB_NAME}.${table} SET`;
    for (const [field, value] of Object.entries(fields)) {
        query += ` ${field} = ${MYSQL.escape(value)},`;
    }
    query = query.slice(0, -1);

    if(conditions){
        query += ` WHERE`;
        for (const [field, value] of Object.entries(conditions)) {
            query += ` ${field} = ${MYSQL.escape(value)},`;
        }
        query = query.slice(0, -1);
    }

    connection.query(query, (err) => { console.error(err) });

}
    

module.exports = { insertIntoTable, selectFromTable, updateTable };