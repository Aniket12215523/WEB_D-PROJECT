// represent database tables
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const menuSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
})

// creating model for the schema/blueprint

module.exports = mongoose.model('Menu', menuSchema);