const express = require('express')

const cartController = require('./cartController')
const CartValidator = require('./CartValidator')

const router = express.Router()
const cartValidator = new CartValidator()

// ********************( GET ALL PRODUCTS )******************** //
router
	.route('/')
	.post(
		cartValidator.createCartRules(),
		cartValidator.validate,
		cartController.createCart
	)

router
	.route('/:id')
	.get(
		cartValidator.cartIdRules(),
		cartValidator.validate,
		cartController.getCartById
	)
	.delete(
		cartValidator.cartIdRules(),
		cartValidator.validate,
		cartController.deleteCartById
	)
	.patch(
		cartValidator.cartIdRules(),
		cartValidator.validate,
		cartController.updateCartById
	)

module.exports = router
