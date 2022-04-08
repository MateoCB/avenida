const { body, param, validationResult } = require('express-validator')

const Jsend = require('./Jsend')
const HTTP_STATUS = require('./HTTP_STATUS')

/**
 * https://express-validator.github.io/docs/
 * Class used to validate and sanitize incoming requests, this should never be used alone,
 * it should be extended by specific entities Clasess in which the validation rules will be
 * defined using the _check object.
 */
class Validator {
	constructor() {
		// _check is the validation object we will use later in the validators to define the rules.
		this.body = body
		this.param = param
	}

	/**
	 * Middleware that actually runs the validations defined by the entity validator.
	 */
	validate(req, res, next) {
		const errors = validationResult(req)

		if (errors.isEmpty()) {
			return next()
		}

		// Extract the error as ['param', 'msg'] ignoring the rest of information so we can
		// be Jsend compliant and transform the array to an object using `Object.fromEntries`
		const extractedErrors = errors.array().map((err) => {
			return [err.param, err.msg]
		})

		return new Jsend(res).sendFail(
			HTTP_STATUS.CLIENT_ERROR.BAD_REQUEST,
			Object.fromEntries(extractedErrors)
		)
	}
}

module.exports = Validator
