define([
	'jquery',
	'underscore',
	'backbone',
	'getbootstrap',
	'modernizr',
	'events/dispatcher',
	'd3'
], function($, _, Backbone, GetBootstrap, Modernizr, Dispatcher, D3) {
		var indexView = Backbone.View.extend({
			el: 'body',

			initialize: function() {

				_.bindAll(this);

				
			},

			render: function() {

				var self = this;

				this.template = this.$el.html();
			}

		});
		
		return new indexView();
	});