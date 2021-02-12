//import express library
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//save all functions that comes with "express" in a variable to access its functions
const app = express();

//add app routes
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.connect('mongodb+srv://Akin:' + process.env.MONGO_ATLAS_PW +
 '@node-rest-shop.bbtwo.mongodb.net/node-rest-shop?retryWrites=true&w=majority',
    {
        useMongoClient: true,
    },
);

app.use(morgan('dev')); //logging
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

//CORS. Cross Origin Ressource Sharing.
// is an HTTP-header based mechanism that allows a server to indicate any other origins 
//(domain, scheme, or port) than its own from which a browser should permit loading of resources.
// ... For security reasons, browsers restrict cross-origin HTTP requests initiated from scripts.

//RESTful api endpoints should always be allowed access to share data between clients and servers.
//They are meant to be consumed.

app.use((req, res, next) => {
    //enabling CORS, "*" -> means allow sharing with any client
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        //telling the browser what client is allowed to request
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//to catch errors
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

//any error that could not be recognized above falls into this block and be caught
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

module.exports = app;