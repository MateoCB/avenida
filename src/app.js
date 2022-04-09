const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const cors = require('cors')

const OperationalError = require('./errors/classes/OperationalError')
const globalErrorHandler = require('./errors/globalErrorHandler')

const productRouter = require('./components/products/productRouter')
const cartRouter = require('./components/carts/cartRouter')

const app = express()

// ********************( EXPRESS MIDDLEWARES )******************** //
if (
	process.env.NODE_ENV === 'development' ||
	process.env.NODE_ENV === 'local'
) {
	app.use(morgan('dev'))
}

app.use(express.json())

app.use(compression())

// ********************( HANDLE CROSS ORIGIN )******************** //
app.use(cors())
app.options('*', cors())

// ********************( HANDLE IMPLEMENTED ROUTES )******************** //
app.use('/api/products', productRouter)

app.use('/api/carts', cartRouter)

// ********************( HANDLE UNKNOWN ROUTES )******************** //
app.all('*', (req, res, next) => {
	next(new OperationalError(`Can't find ${req.originalUrl}`, 404))
})

// ********************( CONFIG GLOBAL ERROR MIDDLEWARE )******************** //
app.use(globalErrorHandler)

module.exports = app
