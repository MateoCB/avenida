// Utility to avoid the necessity to use try/catch blocks everywhere
// Using this automatically calls next with the error so that our global
// error handler kicks into action without explicit error managing
module.exports = (fn) => {
	return async (req, res, next) => {
		fn(req, res, next).catch(next)
	}
}
