const express = require('express')

const productController = require('./productController')
const ProductValidator = require('./ProductValidator')

const router = express.Router()
const productValidator = new ProductValidator()

// ********************( GET ALL PRODUCTS )******************** //
router
	.route('/')
	.post(
		productValidator.createProductRules(),
		productValidator.validate,
		productController.createProduct
	)
	.get(productController.handleQuery, productController.getAllProducts)

router
	.route('/:id')
	.get(
		productValidator.productIdRules(),
		productValidator.validate,
		productController.getProductById
	)
	.delete(
		productValidator.productIdRules(),
		productValidator.validate,
		productController.deleteProductById
	)
	.patch(
		productValidator.productIdRules(),
		productValidator.validate,
		productController.updateProductById
	)

module.exports = router
