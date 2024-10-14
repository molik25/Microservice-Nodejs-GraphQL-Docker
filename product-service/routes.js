const express = require('express');
const Product = require('./model');

const router = express.Router();

router.get('/', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// New route to get a product by ID
router.get('/:id', async (req, res) => {

    console.log(req.params.id , "req.params.id" )

    const product = await Product.findById(req.params.id);

     if (!product) {
         return res.status(404).json({ message: 'Product not found' });
     } else {
        res.json(product);
     }
   // res.json("test");
});


router.post('/', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
});

module.exports = router;
