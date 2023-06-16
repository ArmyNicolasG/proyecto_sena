const express = require("express");
const { insertProvider } = require("./database.js");
require('dotenv').config();
const app = express();


app.get('/', (req, res) => {
    //Here, dynamic HTML page will be sent to front-end each time someone accesses the app, this is the main route.
});

// Providers
app.post('/new-provider', (req, res) => {

    const providerInfo = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    }

    if((providerInfo.name.length > 64 || providerInfo.name == "")
        || (providerInfo.phone.length > 13 || providerInfo.phone == undefined)
        || (isNaN(parseInt(provider.phone)) == true ) 
    ){ res.status(406).send(); }

    else {
        insertProvider(providerInfo)
    }

});



app.listen(process.env.HTTP_SERVER_PORT, () => {
    console.log(`Listening at ${process.env.HTTP_SERVER_PORT} port.`);
});