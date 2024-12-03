const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
    itemId: { type: String, required: true },
    name: { type: String, required: true }, // Include item name
    price: { type: Number, required: true }, // Include item price
    quantity: { type: Number, default: 1 }  // Quantity with default of 1
});

const CartSchema = new mongoose.Schema({
    items: [CartItemSchema] // Array of cart items
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;

