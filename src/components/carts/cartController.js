const CartRepository = require('./CartRepository')

const catchAsync = require('../../utils/catchAsync')
const CRUDController = require('../../utils/CRUDController')

const crudController = new CRUDController(CartRepository)

// ********************( CONTROLLERS )******************** //
exports.createCart = crudController.createOne()

exports.getCartById = crudController.getOne()

exports.deleteCartById = crudController.deleteOne()

exports.updateCartById = crudController.updateOne()
