var Q = require('q')
, mongodb = require('mongodb')

var USERS = require('./libs/users')

function reports () {
	
	var db = null

	var users = null

	return {
		'connect' : function(config) {
			
			var deferred = Q.defer()

			var db = new mongodb.Db(config.database, new mongodb.Server(config.server, config.port, {}), {safe:true})
			
			db.open(function(err, db_p) {
				if (err) 
					deferred.reject(err)
				if (process.env.NODE_ENV==='production') {
					db.authenticate(config.user, config.password, function (err, replies) {
						deferred.resolve()
					})
				} else {
					users = USERS(db)
					deferred.resolve()
				}
			})
			
			return deferred.promise	
		},

		'user' : {
			'findById' : function(id) {
				return users.findById(id)
			}
		}
	}
}

module.exports = reports