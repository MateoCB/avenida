const ProductRepository = require('./ProductRepository')

const catchAsync = require('../../utils/catchAsync')
const Jsend = require('../../utils/Jsend')
const HTTP_STATUS = require('../../utils/HTTP_STATUS')
const CRUDController = require('../../utils/CRUDController')

const crudController = new CRUDController(ProductRepository)

// ********************( CONTROLLERS )******************** //
exports.createProduct = crudController.createOne()

exports.getAllProducts = crudController.getAll()

exports.getProductById = crudController.getOne()

exports.deleteProductById = crudController.deleteOne()

exports.updateProductById = crudController.updateOne()
