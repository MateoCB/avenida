const ErrorMessages = require('./ORDER_ERROR_MESSAGES')

const OperationalError = require('../../errors/classes/OperationalError')
const HttpStatus = require('../../utils/HTTP_STATUS')

class NotEnoughStockError extends OperationalError {
	constructor() {
		super(
			ErrorMessages.NOT_ENOUGH_STOCK,
			HttpStatus.CLIENT_ERROR.BAD_REQUEST
		)
	}
}

module.exports = {
	NotEnoughStockError,
}
