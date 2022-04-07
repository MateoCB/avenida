const OperationalError = require('./OperationalError')
const ERROR_MESSAGES = require('./ERROR_MESSAGES')

class ResourceNotFoundError extends OperationalError {
	constructor() {
		super(ERROR_MESSAGES.RESOURCE_NOT_FOUND, 404)
	}
}

class InternalServerError extends OperationalError {
	constructor() {
		super(ERROR_MESSAGES.INTERNAL_SERVER, 500)
	}
}

module.exports = {
	ResourceNotFoundError,
	InternalServerError,
}
