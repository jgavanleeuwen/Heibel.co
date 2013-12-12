define([
	'jquery',
	'underscore',
	'backbone',
	'getbootstrap',
	'modernizr',
	'events/dispatcher',
	'd3',
	'typer',
	'collections/tweets',
	'views/index/helpers/workflow',
	'views/index/helpers/chart'
], function($, _, Backbone, GetBootstrap, Modernizr, Dispatcher, D3, Typer, TweetCollection, WorkflowView, ChartView) {
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

				$('span.typer').typer([
						'<span class="light">put "</span>Heibel.co<span class="light">"</span>',
						'<span class="light">put "</span>Developer<span class="light">"</span>'
					], { endless: true, delay: 2500 });
				
			}


		});
		
		return new indexView();
	});