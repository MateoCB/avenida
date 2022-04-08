const express = require('express')

const productController = require('./productController')
const router = express.Router()

// ********************( GET ALL PRODUCTS )******************** //
router
	.route('/')
	.post(productController.createProduct)
	.get(productController.handleQuery, productController.getAllProducts)

router
	.route('/:id')
	.get(productController.getProductById)
	.delete(productController.deleteProductById)
	.patch(productController.updateProductById)

module.exports = router
