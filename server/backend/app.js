const express = require("express");
const database = require("./database.js");
require('dotenv').config();
const app = express();


app.get('/', (req, res) => {
    //Here, dynamic HTML page will be sent to front-end each time someone accesses the app, this is the main route.
});

app.

app.listen(process.env.HTTP_SERVER_PORT, () => {
    console.log(`Listening at ${process.env.HTTP_SERVER_PORT} port.`);
});