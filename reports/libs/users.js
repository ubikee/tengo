var Q = require('q')
, _ = require('underscore')
, mongodb = require('mongodb')

function users(db) {

	return {

		signup : function (user) {

			var deferred = Q.defer()

			db.collection('users', function (err, collection) {

				if (err) 
					deferred.reject(err)

				collection.findOne({ 'id' : user.id }, function (err, document) {

					if (err) 
						deferred.reject(err)
					
					if (document) {
						deferred.reject(new Error('user already exist'))
					} else {
						collection.insert(user, {safe:true}, function (err, records) {
							if (err) 
								deferred.reject(err)
							console.log(records[0])
							deferred.resolve(records[0])
						})
					}
				})
			})

	  		return deferred.promise
		},

		login : function (user) {

			var deferred = Q.defer()

			db.collection('users', function (err, collection) {

				if (err) 
					deferred.reject(err)

				collection.findOne({ 'id' : user.id }, function (err, document) {

					if (err) 
						deferred.reject(err)
					
					if (document) {
						if (document.password === user.password) {
							deferred.resolve(document)
						} else {
							deferred.reject(new Error('invalid password')) //TODO Custom Errors!!!!!
						}
					} else {
						deferred.reject(new Error('user not found'))
					}
				})
			})

			return deferred.promise
		},

		findById : function (id) {

			var deferred = Q.defer()

			db.collection('users', function (err, collection) {

				if (err) 
					deferred.reject(err)

				collection.findOne({ 'id' : id }, function (err, document) {

					if (err) 
						deferred.reject(err)

					if (document) {
						deferred.resolve(document)
					} else {
						deferred.reject(new Error('user not found'))
					}
				})
			})

			return deferred.promise
		}
	}
}

module.exports = users