const express = require("express");
const { insertIntoTable, selectFromTable } = require("./database.js");
require('dotenv').config();
const app = express();


app.get('/', (req, res) => {
    //Here, dynamic HTML page will be sent to front-end each time someone accesses the app, this is the main route.
});

// Providers
app.post('/providers/new-provider', (req, res) => {

    if((req.body.name.length > 64 || req.body.name == "")
        || (req.body.phone.length > 13 || req.body.phone == undefined)
        || (isNaN(parseInt(provider.phone)) == true ) 
    ){ res.status(406).send(); }

    else { insertIntoTable({ name: req.body.name, phone: req.body.phone, email: req.phone.email }); }

});
selectFromTable('proveedores', ['id_proveedor'], { "id_proveedor" : 30})
        .then( data => { console.log(data.length) });
app.post('/providers/edit', (req, res) => {

    if(isNaN(req.providerID) == false || req.providerID.length >= 1){
        selectFromTable('proveedores', ['id_proveedor'], { "id_proveedor" : 1})
        .then( data => { 
            if(data.length = 1){  }
        });
    }

});


app.listen(process.env.HTTP_SERVER_PORT, () => {
    console.log(`Listening at ${process.env.HTTP_SERVER_PORT} port.`);
});