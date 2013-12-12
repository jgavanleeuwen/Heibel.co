define([
	'jquery',
	'underscore',
	'backbone',
	'getbootstrap',
	'modernizr',
	'events/dispatcher',
	'd3',
	'collections/tweets',
	'views/index/helpers/workflow',
	'views/index/helpers/chart'
], function($, _, Backbone, GetBootstrap, Modernizr, Dispatcher, D3, TweetCollection, WorkflowView, ChartView) {
		var indexView = Backbone.View.extend({
			el: 'body',

			initialize: function() {

				_.bindAll(this);

				Dispatcher.on('waypoint', this.onWaypointHandler);
				Dispatcher.on('carousel:slide', this.onCarouselSlideHandler);
			},

			onWaypointHandler: function( attrs ) {},

			onCarouselSlideHandler: function(attrs) {
				switch( attrs.slide ){
					case 0:
						this.chartView.animate();
						break;
					case 1:
						this.workflowView.animate();
						break;
				}
			},

			render: function() {

				var self = this;

				this.template = this.$el.html();

				this.workflowView = new WorkflowView().render();
				this.chartView = new ChartView().render();
				
			}


		});
		
		return new indexView();
	});