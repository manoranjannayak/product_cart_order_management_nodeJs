const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number
})

module.exports = mongoose.model('Cart',cartSchema)