const AuthErrors = require('./AuthErrors')

const catchAsync = require('../../utils/catchAsync')

// ********************( GLOBAL AUTH METHODS )******************** //
exports.authenticate = catchAsync(async (req, res, next) => {
	const { key } = req.headers

	if (key !== process.env.API_KEY) {
		throw new AuthErrors.InvalidCredentialsError()
	}

	next()
})
