const express = require('express');
const mongoose = require('mongoose');

//enables us to access this resource "/products"
const router = express.Router();

const Product = require('../models/product');

//create the GET request method for this route
//using '/' because products is the default route
router.get('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price,
    };
    res.status(200).json({
        message: 'Handling GET request to /products',
        createdProduct: product
    });
});

//POST
router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
    });
    product.save().then(result => {
        console.log(result);
    }).catch(err => console.log(err));
    res.status(201).json({
        message: 'Handling POST request to /products',
        createdProduct: product,
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product',
    });
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Delete product',
    });
});

module.exports = router;
