//import express library
const express = require('express');
const morgan = require('morgan');

//save all functions that comes with "express" in a variable to access its functions
const app = express();

//add app routes
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders'); 

app.use(morgan('dev')); //logging

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next)=> {
    const error = new Error('Not found');
    error.status = 404;
    next(error); 
});

app.use((error, req, res, next)=> {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    }); 
});

module.exports = app;