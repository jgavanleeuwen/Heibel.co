define([
	'underscore',
	'backbone',
	'models/model'
	], function( _, Backbone, Model ) {

		var TweetCollection = Backbone.Collection.extend({

			model: Model,

			urlRoot: "http://localhost:3010/tweets",

			url: function() {
				return this.urlRoot;
			}

		});

		return TweetCollection;

});