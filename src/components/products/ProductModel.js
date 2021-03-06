const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
	title: {
		type: String,
		required: [true],
	},
	price: {
		type: Number,
		required: [true],
	},
	description: {
		type: String,
		required: [true],
	},
	category: {
		type: String,
		required: [true],
	},
	image: {
		type: String,
	},
	stock: {
		type: Number,
		required: [true],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
