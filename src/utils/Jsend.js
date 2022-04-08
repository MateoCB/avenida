class Jsend {
	constructor(res) {
		this.res = res
	}

	sendSuccess(httpCode, data) {
		this._validateStatus(httpCode, '2')

		this.res.status(httpCode).json({
			status: 'success',
			data: data,
		})
	}

	sendFail(httpCode, data) {
		this._validateStatus(httpCode, '4')

		this.res.status(httpCode).json({
			status: 'fail',
			data: data,
		})
	}

	sendError(httpCode, message) {
		this._validateStatus(httpCode, '5')

		this.res.status(httpCode).json({
			status: 'error',
			message: message,
		})
	}

	/**
	 * To avoid sending incoherent responses, we should validate if the
	 * http status code matches the method used (success, fail or error).
	 * @param {string} status The status recieved.
	 * @param {string} shouldStartWith The number status should start with
	 * according to the method called.
	 */
	_validateStatus(httpCode, shouldStartWith) {
		if (!httpCode.startsWith(shouldStartWith)) {
			throw new Error(
				'The Jsend method called does not match the http status code expected.'
			)
		}
	}
}

module.exports = Jsend
