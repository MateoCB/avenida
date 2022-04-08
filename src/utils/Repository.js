class Repository {
	constructor(Model) {
		this.collection = Model
	}

	/**
	 * Get all documents.
	 * @param {Object} filter
	 * @param {string} populateOptions
	 */
	find(filter, populateOptions) {
		const query = this.collection.find(filter)

		if (populateOptions) {
			query.populate(populateOptions)
		}

		return query
	}

	findLimited(filter, limit) {
		return this.collection.find(filter).limit(limit)
	}

	/**
	 * Finds a single document by its _id field. findById(id) is almost*
	 * equivalent to findOne({ _id: id }). findById() triggers findOne hooks.
	 * @param {*} id
	 */
	findById(id) {
		return this.collection.findById(id)
	}

	/**
	 * Finds one document. The conditions are cast to their
	 * respective SchemaTypes before the command is sent.
	 * @param {Object} filter
	 * @param {string} populateOptions
	 */
	findOne(filter, populateOptions) {
		const query = this.collection.findOne(filter)

		if (populateOptions) {
			query.populate(populateOptions)
		}

		return query
	}

	/**
	 * Issues a mongodb findOneAndDelete command. Finds a matching document,
	 * removes it, passing the found document (if any) to the callback.
	 * Executes immediately if callback is passed.
	 * @param {Object} filter
	 */
	findOneAndDelete(filter) {
		return this.collection.findOneAndDelete(filter)
	}

	/**
	 * Counts number of documents matching criteria in a database collection.
	 * @param {Object} filter
	 */
	count(filter) {
		return this.collection.countDocuments(filter)
	}

	/**
	 * Shortcut for saving one or more documents to the database.
	 * MyModel.create(docs) does new MyModel(doc).save() for every doc in docs.
	 * Triggers the save() hook.
	 * @param {Object} document
	 */
	create(document) {
		return this.collection.create(document)
	}

	/**
	 * Issues a mongodb findAndModify update command by a document's _id field.
	 * findByIdAndUpdate(id, ...) is equivalent to findOneAndUpdate({ _id: id }, ...).
	 * If mongoose option 'useFindAndModify': set to false it uses native findOneAndUpdate()
	 * rather than deprecated findAndModify(). Returns the updated document and run validations.
	 * @param {*} id
	 * @param {Object} document
	 */
	update(id, document) {
		return this.collection.findByIdAndUpdate(id, document, {
			returnOriginal: false,
			runValidators: true,
		})
	}

	updateManyById(idList, document) {
		return this.collection.updateMany(
			{
				_id: {
					$in: idList,
				},
			},
			document,
			{
				returnOriginal: false,
				runValidators: true,
			}
		)
	}

	/**
	 * Removes a document by its _id field.
	 * @param {*} id
	 */
	remove(id) {
		return this.collection.findByIdAndDelete(id)
	}

	/**
	 * Declare and/or execute this query as a deleteMany() operation. Works like remove,
	 * except it deletes every document that matches filter in the collection, regardless of the value of single.
	 *
	 * This function triggers deleteMany middleware.
	 * @param {Object} filter
	 */
	deleteMany(filter) {
		return this.collection.deleteMany(filter)
	}

	save(document) {
		document.save()
	}
}

module.exports = Repository
