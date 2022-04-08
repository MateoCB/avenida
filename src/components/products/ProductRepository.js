const Repository = require('../../utils/Repository')
const ProductModel = require('./ProductModel')

class ProductRepository extends Repository {
	constructor() {
		super(ProductModel)
	}
}

module.exports = ProductRepository
