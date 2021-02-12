const express = require('express');

//enables us to access this resource "/products"
const router = express.Router();

router.get('/', (req, res, next) => {
    const order = {
        productId : req.body.productId,
        quantity : req.body.quantity,
    };
    res.status(200).json({
        message : 'Orders were fetched',
        order : order,
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Order was created',
    });
});

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'You have gotten an order',
        id:  req.params.orderId,
    });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'You have deleted an order',
        id:  req.params.orderId,
    });
});

module.exports = router;
