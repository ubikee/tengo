var Q = require('q')
, mongodb = require('mongodb')

function globalPosition(db) {

	return {

		findById : function (id) {

			var deferred = Q.defer()

			db.collection('globalPositions', function (err, collection) {

				if (err)
					deferred.reject(err)

				collection.findOne({ 'id' : id }, function (err, document) {

					if (err)
						deferred.reject(err)

					if (document) {
						deferred.resolve(document);
					} else {
						deferred.reject(new Error('globalPosition not found for user '+id));
					}
				})
			})

			return deferred.promise
		}
	}
}

module.exports = globalPosition