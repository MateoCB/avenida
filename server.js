/* eslint-disable no-console */
require('dotenv').config({ path: './.env' })
// const mongoose = require('mongoose')

const DEFAULT_PORT = 3000

// ********************( GLOBAL HANDLER FOR SYNC ERRRORS )******************** //
process.on('uncaughtException', (err, origin) => {
	console.log(
		`uncaughtException caught globally. error name: ${err.name}, message: ${err.message}`
	)
	console.log('full error stack:', err)
	console.log('error origin:', origin)

	// Perform here all synchronous cleanup of allocated resources

	console.log('Shutting down server..')
	process.exit(1)
})

const app = require('./src/app')

// ********************( CONNECT TO REMOTE DATABASE )******************** //
// const databaseConnection = process.env.DATABASE_CONNECTION.replace(
// 	'<user>',
// 	process.env.DATABASE_USER
// )
// 	.replace('<password>', process.env.DATABASE_PASSWORD)
// 	.replace('<enviroment>', process.env.DATABASE_ENV)

// mongoose
// 	.connect(databaseConnection, {
// 		useNewUrlParser: true,
// 		useCreateIndex: true,
// 		useFindAndModify: false,
// 		useUnifiedTopology: true,
// 	})
// 	.then(() => {
// 		console.log('Conection to database successful')
// 	})

// ********************( START THE SERVER )******************** //
const port = process.env.PORT || DEFAULT_PORT
const server = app.listen(port, () => {
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${port}`
	)
})

// ********************( GLOBAL HANDLER FOR ASYNC ERRRORS )******************** //
process.on('unhandledRejection', (err, promise) => {
	console.log(
		`unhandledRejection caught globally. error name: ${err.name}, message: ${err.message}`
	)
	console.log('full error stack:', err)
	console.log('unhandled promise:', promise)
	console.log('Shutting down server..')
	server.close(() => {
		process.exit(1)
	})
})
