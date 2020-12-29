const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    status: String
})

module.exports = mongoose.model('order',orderSchema)