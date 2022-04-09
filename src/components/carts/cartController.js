const CartRepository = require('./CartRepository')

const catchAsync = require('../../utils/catchAsync')
const CRUDController = require('../../utils/CRUDController')

const crudController = new CRUDController(CartRepository)

// ********************( CONTROLLERS )******************** //
exports.createCart = crudController.createOne()

exports.getCartById = crudController.getOne()

exports.deleteCartById = crudController.deleteOne()

exports.updateCartById = crudController.updateOne()

// ********************( MIDDLEWARES )******************** //
/**
 * Verify if the products list is not empty
 */
exports.verifyProductsList = catchAsync(async (req, res, next) => {
	const { products } = req.body

	next()
})
