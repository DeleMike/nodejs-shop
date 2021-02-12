const express = require('express');

//enables us to access this resource "/products"
const router = express.Router();

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
    res.status(201).json({
        message: 'Handling POST request to /products'
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (id === 'special') {
        res.status(200).json({
            message: 'You have gotten the special product',
            id: id,
        });
    } else {
        res.status(200).json({
            message: 'You got a normal product',
            id: id,
        });
    }
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
