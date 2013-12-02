define([
	'underscore',
	'backbone'
	], function( _, Backbone) {
		var Model = Backbone.Model.extend({

			idAttribute: '_id'

		});
		
		return Model;
	});