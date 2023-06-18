const express = require("express");
var bodyParser = require("body-parser");
const { insertIntoTable, selectFromTable, updateTable } = require("./database.js");
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const getExactTimeFormat = () => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

// PROVIDERS.
app.post('/providers/new-provider', (req, res) => {
    if((req.body.name.length > 64 || req.body.name == "")
        || (req.body.phone.length > 13 || req.body.phone == undefined)
        || (isNaN(parseInt(req.body.phone)) == true ) 
    ){ res.status(406).send(); }
    else {
        insertIntoTable('proveedores', { nombre: req.body.name, telefono: parseInt(req.body.phone), email: req.body.email });
        res.status(201).send();
    }
});

app.post('/providers/edit-provider', (req, res) => {
    if((req.body.name.length > 64 || req.body.name.length == 0) || (req.body.phone.length > 13 || req.body.phone.length == 0 || isNaN(parseInt(req.body.phone)) == true) || (req.body.email.length > 255 || req.body.email.length == 0)){
        res.status(406).send();
    }
    else if (isNaN(parseInt(req.body.providerID)) == false && req.body.providerID.length >= 1){
        selectFromTable('proveedores', ['id_proveedor'], { "id_proveedor" : req.body.providerID})
        .then( data => {
            if(data.length == 1){
                updateTable('proveedores', { nombre: req.body.name, telefono: req.body.phone, email: req.body.email }, { id_proveedor : req.body.providerID });
                res.status(201).send();
            } else { res.status(406).send(); }
        });
    } else { res.status(406).send(); }
});

// ARTICLES.
app.post('/articles/new', (req, res) =>{
    if (req.body.name.length >= 1 && req.body.name.length <= 64) { insertIntoTable('articulos', { nombre: req.body.name }); res.status(201).send(); }
    else { res.status(406).send(); }
});

// ORDERS.
app.post('/orders/new', (req, res) => {
    
    if (req.body.providerID >= 1 && isNaN(parseInt(req.body.providerID)) == false && req.body.articles.length >= 1 ){
        insertIntoTable('pedidos', { id_proveedor: req.body.providerID, fecha: getExactTimeFormat()})
        .then( orderID => {
            req.body.articles.forEach((article) => {
                insertIntoTable('detalle_pedidos', { 
                    id_pedido : orderID,
                    id_articulo : article.articleID,
                    cantidad : article.quantity,
                    costo : article.amount
                });
                res.status(201).send();
            });
        });
    }    
    else { res.status(406).send(); }
});

app.post('/orders/arrives', (req, res) => {
    if(isNaN(parseInt(req.body.orderID)) == false){
        selectFromTable('pedidos', ['id_pedido'], { id_pedido : req.body.orderID })
        .then( data => {
            if(data.length == 1){
                updateTable('pedidos', { fecha_llegada : getExactTimeFormat() }, { id_pedido: data[0].id_pedido });
                res.status(201).send();
            } 
            else { res.status(406).send(); }
        });
    }
});

// SALES.
app.post('/sales/new', (req, res) => {
    
    if (req.body.articles.length >= 1){
        let total = 0;
        req.body.articles,forEach((article) => { 
            selectFromTable('articulos',['precio_sugerido'],{ id_articulo : article.articleID })
            .then( data => { 
                if(data.length == 0 || data[0].precio_sugerido == null){ res.send(406).send(); return; }
                else { total += precio_sugerido }
            });
        });
        insertIntoTable('ventas', { total: total, fecha: getExactTimeFormat()})
        .then( orderID => {
            req.body.articles.forEach((article) => {
                insertIntoTable('detalle_ventas', { 
                    id_venta : orderID,
                    id_articulo : article.articleID,
                    cantidad : article.quantity,
                });
                res.status(201).send();
            });
        });
    }    
    else { res.status(406).send(); }
});


   

app.listen(process.env.HTTP_SERVER_PORT, () => { console.log(`Listening at ${process.env.HTTP_SERVER_PORT} port.`); });