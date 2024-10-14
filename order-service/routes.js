const express = require('express');
const Order = require('./model');
const axios = require('axios');

const router = express.Router();

router.post('/', async (req, res) => {
    const { productId, quantity } = req.body;

    console.log(req.body, "req.body");

    // Check product availability
    try {
        const productResponse = await axios.get(`http://localhost:8001/api/products/${productId}`);
        console.log(productResponse, "productResponse");
        const product = productResponse.data;

        if (product.stock < quantity) {
            return res.status(400).json({ message: 'Not enough stock available' });
        }

        // Create order
        const order = new Order({ productId, quantity });
        await order.save();

        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching product' });
    }
});

module.exports = router;
