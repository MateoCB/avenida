const Repository = require('../../utils/Repository')
const CartModel = require('./CartModel')

class CartRepository extends Repository {
	constructor() {
		super(CartModel)
	}
}

module.exports = CartRepository
