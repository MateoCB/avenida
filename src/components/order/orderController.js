const orderService = require('./orderService')

const catchAsync = require('../../utils/catchAsync')
const HTTP_STATUS = require('../../utils/HTTP_STATUS')
const Jsend = require('../../utils/Jsend')

// ********************( CONTROLLERS )******************** //
exports.createOrder = catchAsync(async (req, res, next) => {
	const order = req.body

	const orderCreated = await orderService.createOrder(order)

	new Jsend(res).sendSuccess(HTTP_STATUS.SUCCESS.OK, {
		order: orderCreated,
	})
})
