var Q          = require('q'),
    _          = require('underscore'),
    repository = require('./libs/repository');

var api = function() {
	
	var catalog = new repository(),
	    users   = new repository();

	return {

		registry : function(user) {
			var deferred = Q.defer();
			users.save(user, deferred.resolve);
			return deferred.promise;
		},

		user : function(nickName) {
			var deferred = Q.defer();
			users.find(nickName, deferred.resolve, deferred.reject);
			return deferred.promise;
		},

		catalog : function() {
			return catalog.all();
		},

		record : function(article) {
			var deferred = Q.defer();
			catalog.save(article, deferred.resolve);
			return deferred.promise;
		},

		article : function(id) {
			var deferred = Q.defer();
			catalog.find(id, deferred.resolve);
			return deferred.promise;
		},

		inventory : function(user) {
			return new repository();
		},

		purchase : function(userID, articleID) {
			this.article(articleID)
				.then(this.inventory(userID).save)
				.done();
		}
	};
};

module.exports = api();