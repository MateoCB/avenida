const express = require('express')

const cartController = require('./cartController')
const router = express.Router()

// ********************( GET ALL PRODUCTS )******************** //
router
	.route('/')
	.post(cartController.verifyProductsList, cartController.createCart)

router
	.route('/:id')
	.get(cartController.getCartById)
	.delete(cartController.deleteCartById)
	.patch(cartController.updateCartById)

module.exports = router
