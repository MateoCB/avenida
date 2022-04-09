const ProductRepository = require('./ProductRepository')

const catchAsync = require('../../utils/catchAsync')
const CRUDController = require('../../utils/CRUDController')

const crudController = new CRUDController(ProductRepository)

// ********************( CONTROLLERS )******************** //
exports.createProduct = crudController.createOne()

exports.getAllProducts = crudController.getAll()

exports.getProductById = crudController.getOne()

exports.deleteProductById = crudController.deleteOne()

exports.updateProductById = crudController.updateOne()

// ********************( MIDDLEWARES )******************** //
/**
 * If the client sends a q query on the products it will cast
 * it to title LIKE q no case sensitive.
 */
exports.handleQuery = catchAsync(async (req, res, next) => {
	const { q } = req.query

	req.query = { title: new RegExp(q, 'i') }

	next()
})
