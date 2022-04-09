const ErrorMessages = require('./AUTH_ERROR_MESSAGES')

const OperationalError = require('../../errors/classes/OperationalError')
const HttpStatus = require('../../utils/HTTP_STATUS')

class InvalidCredentialsError extends OperationalError {
	constructor() {
		super(
			ErrorMessages.INVALID_API_KEY,
			HttpStatus.CLIENT_ERROR.UNAUTHORIZED
		)
	}
}

module.exports = {
	InvalidCredentialsError,
}
