exports.SUCCESS = {
	/**
	 * [200]
	 * The request has succeeded. The meaning of the success depends on the HTTP method.
	 */
	OK: '200',

	/**
	 * [201]
	 * The request has succeeded and a new resource has been created as a result,
	 * this is typically the response sent after POST requests, or some PUT requests.
	 */
	CREATED: '201',

	/**
	 * [204]
	 * There is no content to send for this request, but the headers may be useful,
	 * the server successfully processed the request, but is not returning any content.
	 */
	NO_CONTENT: '204',
}

exports.CLIENT_ERROR = {
	/**
	 * [400]
	 * The server could not understand the request due to invalid syntax.
	 */
	BAD_REQUEST: '400',

	/**
	 * [401]
	 * Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated",
	 * that is, the client must authenticate itself to get the requested response.
	 */
	UNAUTHORIZED: '401',

	/**
	 * [403]
	 * The client does not have access rights to the content; that is, it is unauthorized, so the server is
	 * refusing to give the requested resource. Unlike 401, the client's identity is known to the server.
	 */
	FORBIDDEN: '403',

	/**
	 * [404]
	 * The server can not find the requested resource. In the browser, this means the URL is not recognized,
	 * in an API, this can also mean that the endpoint is valid but the resource itself does not exist.
	 */
	NOT_FOUND: '404',

	/**
	 * [418]
	 * I refuse to brew coffee with a teapot.
	 */
	I_AM_A_TEAPOT: '418',
}

exports.SERVER_ERROR = {
	/**
	 * [500]
	 * The server has encountered a situation it doesn't know how to handle.
	 */
	INTERNAL_SERVER_ERROR: '500',

	/**
	 * [500]
	 * server error response code indicates that the server, while acting as a gateway or proxy,
	 * received an invalid response from the upstream server.
	 */
	BAD_GATEWAY_ERROR: '502',
}
