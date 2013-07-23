var Q = require('q')
, mongodb = require('mongodb')
, config = require('../config')()

function globalPosition() {
 
	var db = new mongodb.Db(config.mongo.database, new mongodb.Server(config.mongo.server, config.mongo.port, {}), {safe:true});

	db.open(function(err, db_p) {
		if (err) { throw err }
		if (process.env.NODE_ENV==='production') {
			db.authenticate(config.mongo.user, config.mongo.password, function (err, replies) {
				// You are now connected and authenticated.
			})
		}
	})

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