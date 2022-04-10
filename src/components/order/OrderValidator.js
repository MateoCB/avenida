const errorMessages = require('./ORDER_ERROR_MESSAGES')

const Validator = require('../../utils/Validator')

class CartValidator extends Validator {
	createOrderRules() {
		return [
			this.body('productId')
				.isMongoId()
				.withMessage(errorMessages.PRODUCT_ID_INVALID),

			this.body('quantity')
				.isInt({ min: 1, max: 1000 })
				.withMessage(errorMessages.PRODUCT_QUANTITY_INVALID),

			this.body('name')
				.isString()
				.isLength({ min: 3, max: 60 })
				.withMessage(errorMessages.NAME_INVALID),

			this.body('dni')
				.isString()
				.isLength({ min: 8, max: 8 })
				.withMessage(errorMessages.DNI_INVALID),
		]
	}
}

module.exports = CartValidator
