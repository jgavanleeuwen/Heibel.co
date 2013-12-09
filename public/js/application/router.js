define([
	'jquery',
	'underscore',
	'backbone',
	'events/dispatcher',
	'views/index/index'
	], 
	function($, _, Backbone, Dispatcher, IndexView, MapView) {
		var AppRouter = Backbone.Router.extend({

			// Routes
			routes: {
				'*actions' : 'index'
			},

			index: function() {
				IndexView.render();
			}
		});

		return AppRouter;
	});
