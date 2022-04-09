const catchAsync = require('../../utils/catchAsync')
const HTTP_STATUS = require('../../utils/HTTP_STATUS')

// ********************( CONTROLLERS )******************** //
exports.createOrder = catchAsync(async (req, res, next) => {
	const order = req.body

	new Jsend(res).sendSuccess(HTTP_STATUS.SUCCESS.CREATED, {
		order: order,
	})
})
