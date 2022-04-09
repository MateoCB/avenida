const errorMessages = require('./CART_ERROR_MESSAGES')

const Validator = require('../../utils/Validator')

class CartValidator extends Validator {
	createOrderRules() {
		return [
			this.body('products')
				.isArray({ min: 1, max: 100 })
				.withMessage(errorMessages.PRODUCTS_EMPTY),

			this.body('products.*.productId')
				.isMongoId()
				.withMessage(errorMessages.PRODUCT_ID_INVALID),

			this.body('products.*.quantity')
				.isInt({ min: 1, max: 1000 })
				.withMessage(errorMessages.PRODUCT_QUANTITY_INVALID),
		]
	}
}

module.exports = CartValidator
