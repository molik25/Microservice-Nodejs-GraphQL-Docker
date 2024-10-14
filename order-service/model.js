const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    productId: String,
    quantity: Number,
});

module.exports = mongoose.model('Order', orderSchema);
