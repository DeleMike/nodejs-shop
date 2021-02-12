//import express library
const express = require('express');

//save all functions that comes with "express" in a variable to access its functions
const app = express();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders'); 

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

module.exports = app;