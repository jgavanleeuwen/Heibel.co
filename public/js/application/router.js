define([
	'jquery',
	'underscore',
	'backbone',
	'events/dispatcher',
	'views/index/index',
	'views/map/map'
	], 
	function($, _, Backbone, Dispatcher, IndexView, MapView) {
		var AppRouter = Backbone.Router.extend({

			// Routes
			routes: {
				'map': 'map',
				'_=_': 'index',
				'' : 'index'
			},

			// Actions
			map: function() {
				MapView.render();
			},

			index: function() {
				IndexView.render();
			}

		});

		return AppRouter;
	});
