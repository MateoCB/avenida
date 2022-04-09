const express = require('express')

const productController = require('./productController')
const ProductValidator = require('./ProductValidator')

const authController = require('../auth/authController')

const router = express.Router()
const productValidator = new ProductValidator()

// ********************( GET ALL PRODUCTS )******************** //
router
	.route('/')
	.post(
		authController.authenticate,
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
		authController.authenticate,
		productValidator.productIdRules(),
		productValidator.validate,
		productController.deleteProductById
	)
	.patch(
		authController.authenticate,
		productValidator.productIdRules(),
		productValidator.validate,
		productController.updateProductById
	)

module.exports = router
