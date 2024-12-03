const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
});

const CategorySchema = new mongoose.Schema({
    category: { type: String, required: true },
    items: [MenuItemSchema],
});

const Menu = mongoose.model('Menu', CategorySchema);

module.exports = Menu;