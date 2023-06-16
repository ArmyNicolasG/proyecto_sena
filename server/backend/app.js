const express = require("express");
const { insertIntoTable, selectFromTable, updateTable } = require("./database.js");
require('dotenv').config();
const app = express();


// app.get('/', (req, res) => {
//     //Here, dynamic HTML page will be sent to front-end each time someone accesses the app, this is the main route.
// });

// Providers
app.post('/providers/new-provider', (req, res) => {

    if((req.body.name.length > 64 || req.body.name == "")
        || (req.body.phone.length > 13 || req.body.phone == undefined)
        || (isNaN(parseInt(provider.phone)) == true ) 
    ){ res.status(406).send(); }

    else {
        insertIntoTable({ name: req.body.name, phone: req.body.phone, email: req.phone.email });
        res.status(201).send();
    }
});

app.post('/providers/edit-provider', (req, res) => {

    if((req.body.name.length > 64 || req.body.name.length == 0) || (req.body.phone.length > 13 || req.body.phone.length == 0 || isNaN(parseInt(req.body.phone)) == true) || (req.body.email.length > 255 || req.body.email.length == 0)){
        res.status(406).send();
    }
    else if (isNaN(req.providerID) == false && req.providerID.length >= 1){
        selectFromTable('proveedores', ['id_proveedor'], { "id_proveedor" : req.body.providerID})
        .then( data => {
            if(data.length = 1){
                updateTable('proveedores', { nombre: req.body.name, telefono: req.body.phone, email: req.body.email }, { id_proveedor : req.body.providerID });
                res.status(201).send();
            } else { res.status(400).send(); }
        });
    }
});

//Orders



app.listen(process.env.HTTP_SERVER_PORT, () => {
    console.log(`Listening at ${process.env.HTTP_SERVER_PORT} port.`);
});