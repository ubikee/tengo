var _ = require('underscore');

function repository() {

	var items = [];

	return {

		save : function (item, onSuccess, onError) {
			items.push(item);
			if (onSuccess) 
				onSuccess(item);
		},

		find : function (id, onSuccess, onError) {
			
			var item = _.find(items,function(p) { return p.id === id; });

			if (item) 
				onSuccess(item);
			else
				onError(new Error("item not found!"));
		},

		all : function () {
			return items;
		}
	}
};

module.exports = repository;