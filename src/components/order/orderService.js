const OrderErrors = require('./OrderErrors')

const ProductRepository = require('../products/ProductRepository')

const productRepository = new ProductRepository()

// ********************( PUBLIC )******************** //
/**
 * Este metodo solo simula la creacion de una orden, como dice la
 * consigna se fija que exista la cantidad a comprar pero no crea
 * realmente una orden.
 * @param {Object} order Order to create
 * @returns The order created
 */
exports.createOrder = async (order) => {
	const product = await productRepository.findById(order.productId)

	if (product.stock < order.quantity) {
		throw new OrderErrors.NotEnoughStockError()
	}

	return order
}
