define([
	'underscore',
	'backbone',
	'models/model'
	], function( _, Backbone, Model ) {

		var ActivityCollection = Backbone.Collection.extend({

			model: Model,

			urlRoot: "http://localhost:3000/activities",

			url: function() {
				return this.urlRoot;
			}

		});

		return ActivityCollection;

});