const express = require('express')

const orderController = require('./orderController')
const OrderValidator = require('./OrderValidator')

const router = express.Router()
const orderValidator = new OrderValidator()

router
	.route('/')
	.post(
		orderValidator.createOrderRules(),
		orderValidator.validate,
		orderController.createOrder
	)

module.exports = router
