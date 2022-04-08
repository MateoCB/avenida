const pluralize = require('pluralize')

const catchAsync = require('./catchAsync')
const Jsend = require('./Jsend')
const HTTP_STATUS = require('./HTTP_STATUS')
const GlobalErrors = require('../errors/classes/GlobalErrors')

class CRUDController {
	constructor(Repository) {
		this.repository = new Repository()
	}

	/**
	 * Deletes the document using as _id the value from `req.params.id`.
	 * @param {*} onComplete Callback called after completion with the document deleted as parameter.
	 */
	deleteOne(onComplete) {
		return catchAsync(async (req, res, next) => {
			const documentDeleted = await this.repository.remove(req.params.id)

			if (!documentDeleted) {
				return next(new GlobalErrors.ResourceNotFoundError())
			}

			new Jsend(res).sendSuccess(HTTP_STATUS.SUCCESS.NO_CONTENT, null)

			if (onComplete) {
				onComplete(documentDeleted)
			}
		})
	}

	/**
	 * Updates the document using as _id the value from `req.params.id` and `req.body` as the document.
	 * @param {*} onComplete Callback called after completion with the  updated document as parameter.
	 */
	updateOne(onComplete) {
		return catchAsync(async (req, res, next) => {
			const documentUpdated = await this.repository.update(
				req.params.id,
				req.body
			)
			const modelName = this._getModelName()

			if (!documentUpdated) {
				return next(new globalErrors.ResourceNotFoundError())
			}

			new Jsend(res).sendSuccess(HTTP_STATUS.SUCCESS.OK, {
				[modelName]: documentUpdated,
			})

			if (onComplete) {
				onComplete(documentUpdated)
			}
		})
	}

	/**
	 * Creates a document from `req.body`.
	 * @param {*} onComplete Callback called after completion with the document created as parameter.
	 */
	createOne(onComplete) {
		return catchAsync(async (req, res, next) => {
			const documentCreated = await this.repository.create(req.body)
			const modelName = this._getModelName()

			new Jsend(res).sendSuccess(HTTP_STATUS.SUCCESS.CREATED, {
				[modelName]: documentCreated,
			})

			if (onComplete) {
				onComplete(documentCreated)
			}
		})
	}

	/**
	 * Gets one document using as _id `req.params.id`.
	 * @param {*} onComplete Callback called after completion with the document retrieved as parameter.
	 */
	getOne(onComplete) {
		return catchAsync(async (req, res, next) => {
			const document = await this.repository.findById(req.params.id)
			const modelName = this._getModelName()

			if (!document) {
				return next(new globalErrors.ResourceNotFoundError())
			}

			new Jsend(res).sendSuccess(HTTP_STATUS.SUCCESS.OK, {
				[modelName]: document,
			})

			if (onComplete) {
				onComplete(document)
			}
		})
	}

	/**
	 * Gets all documents.
	 * @param {*} onComplete Callback called after completion with the documents as parameter.
	 */
	getAll(onComplete) {
		return catchAsync(async (req, res, next) => {
			const documents = await this.repository.find()
			const modelName = this._getModelName(true)

			new Jsend(res).sendSuccess(HTTP_STATUS.SUCCESS.OK, {
				results: documents.length,
				[modelName]: documents,
			})

			if (onComplete) {
				onComplete(documents)
			}
		})
	}

	/**
	 * Jsend envelops the data using the entity name, for example when returning a list of users
	 * it will be data: { users: [] }, this method obtains the entity name from the repository instance
	 * and returns it. When lists of entities are beeing returned the name should be in plural, in this case
	 * use forcePluralizedName in true.
	 * @param {*} forcePluralizedName Forces the entity name to be in plural.
	 */
	_getModelName(forcePluralizedName) {
		let modelName = this.repository.collection.modelName.toLowerCase()

		if (forcePluralizedName) {
			modelName = pluralize(modelName)
		}

		return modelName
	}
}

module.exports = CRUDController
