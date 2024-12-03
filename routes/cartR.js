const express = require('express');
const Cart = require('../schemas/cart.schema'); 
const Menu = require('../schemas/menu.schema');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const router = express.Router();

// Add item to the cart
router.post('/add', async (req, res) => {
    let { itemId, quantity } = req.body;

    try {
        if (!ObjectId.isValid(itemId)) {
            return res.status(400).json({ message: 'Invalid itemId' });
        }

        // Convert itemId to ObjectId
        itemId = new ObjectId(itemId);
        quantity = parseInt(quantity); // Ensure quantity is a number

        // Find the item in MongoDB using ObjectId
        const foundItem = await Menu.findOne({ "items._id": itemId }, { "items.$": 1 });

        if (!foundItem) {
            return res.status(404).json({ message: 'Item not found in the menu' });
        }

        const item = foundItem.items[0]; // Access the matched item
        const { name, price } = item;

        let cart = await Cart.findOne();
        if (!cart) {
            cart = new Cart({ items: [] });
        }

        const existingItemIndex = cart.items.findIndex(item => item.itemId === itemId.toString());
        if (existingItemIndex !== -1) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({ itemId: itemId.toString(), name, price, quantity });
        }

        await cart.save();
        res.status(200).json({ message: 'Item added to cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error adding item to cart', error: error.message });
    }
});

// Get cart details
router.get('/', async (req, res) => {
    try {
        const cart = await Cart.findOne();
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart', error: error.message });
    }
});

// Remove item from cart
router.delete('/remove/:itemId', async (req, res) => {
    const { itemId } = req.params;

    try {
        const cart = await Cart.findOne();
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item.itemId.toString() !== itemId);

        await cart.save();
        res.status(200).json({ message: 'Item removed from cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error removing item from cart', error: error.message });
    }
});

module.exports = router;
