const OperationalError = require('./classes/OperationalError')
const ERROR_MESSAGES = require('./classes/ERROR_MESSAGES')

const globalErrorHandler = (err, req, res, next) => {
	// Set default values in case the error wasn't created by us.
	err.statusCode = err.statusCode || 500
	err.status = err.status || 'error'

	// Copy the error so we can manipulate it.
	let error = {
		statusCode: err.statusCode,
		status: err.status,
		isOperational: err.isOperational,
		message: err.message,
	}

	// Check if there was any field validation in Mongoose.
	if (err.name === 'ValidationError') {
		error = handleMongooseValidationError(err)
	}

	// Check if there was a duplicate fields error in Mongo.
	if (err.code === 11000) {
		error = handleMongoDuplicateFieldsError(err)
	}

	// In development we want to send extra information, so we
	// treat it differently.
	if (
		process.env.NODE_ENV === 'development' ||
		process.env.NODE_ENV === 'local'
	) {
		return sendDevelopmentError(error, res)
	}

	// In case we are not in development.
	sendProductionError(error, res)
}

const sendDevelopmentError = (err, res) => {
	// In development mode we want to send as much info about the error as possible.
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
		error: err,
		stack: err.stack,
	})
}

const sendProductionError = (err, res) => {
	// As an operational error we trust it and send the details to the client.
	if (err.isOperational) {
		return res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		})
	}

	// As a non operational error we dont trust it, so we dont want to leak any details.
	console.error('Non operational error', err)
	res.status(500).json({
		status: 'error',
		message: ERROR_MESSAGES.INTERNAL_SERVER,
	})
}

const handleMongoDuplicateFieldsError = (err) => {
	const message = `Campos duplicados: ${JSON.stringify(err.keyValue)}`
	return new OperationalError(message, 400)
}

const handleMongooseValidationError = (err) => {
	const errors = Object.values(err.errors).map((el) => el.message)
	const message = `Datos inválidos: ${errors.join(' ')}`
	return new OperationalError(message, 400)
}

module.exports = globalErrorHandler
