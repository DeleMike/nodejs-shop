//import express library
const express = require('express');

//save all functions that comes with "express" in a variable to access its functions
const app = express();

app.use((req, res, next) => {
    res.status(200).json({
        message : 'It works!'
    });
});

module.exports = app;