const errorMessages = require('./PRODUCT_ERROR_MESSAGES')

const Validator = require('../../utils/Validator')

class ProductValidator extends Validator {
	createProductRules() {
		return [
			this.body('title')
				.isString()
				.isLength({ min: 3, max: 60 })
				.withMessage(errorMessages.PRODUCT_TITLE_INVALID),

			this.body('price')
				.isInt({ min: 1, max: 1000000 })
				.withMessage(errorMessages.PRODUCT_PRICE_INVALID),

			this.body('description')
				.isString()
				.isLength({ min: 3, max: 300 })
				.withMessage(errorMessages.PRODUCT_DESCRIPTION_INVALID),

			this.body('category')
				.isString()
				.isLength({ min: 3, max: 60 })
				.withMessage(errorMessages.PRODUCT_CATEGORY_INVALID),

			this.body('stock')
				.isInt({ min: 1, max: 1000000 })
				.withMessage(errorMessages.PRODUCT_STOCK_INVALID),
		]
	}

	productIdRules() {
		return [
			this.param('id')
				.isMongoId()
				.withMessage(errorMessages.PRODUCT_ID_INVALID),
		]
	}
}

module.exports = ProductValidator
