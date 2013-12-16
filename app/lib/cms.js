var _ = require('underscore');

module.exports = {

	data: [],

	set: function( args, callback ) {

		this.data = args;

		if (typeof callback === 'function') {
			callback(null);
		}

	},
		
	get: function( args, callback ) {

		var self = this;
		var response = _.pluck(_.where(self.data, { row: args.row, col: args.col }), 'value');

		if (typeof callback === 'function') {
			callback(null, response);
		} else {
			return response;
		}

	}

};