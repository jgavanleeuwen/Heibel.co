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

				/*$('span.typer')
					.on('keydown', function(e) {
						if (e.keyCode === 13) {
							var txt = $(this).text();
							if(txt.indexOf('find') === 0) {
								$.scrollTo($('*:contains("' + txt.replace('find ', '') + '")').last(), 250, {axis: 'y', offset: {top:-100} });
							} else if(txt.indexOf('go' === 0)) {
								$.scrollTo('#' + $(this).text().replace('go', '').replace(/^\s+|\s+$/g, ''), 250, {axis: 'y', offset: {top:-50} });
							}  else if(txt.indexOf('hire' === 0)) {
								$.scrollTo('#footer', 250, {axis: 'y', offset: {top:-50} });
							}
							e.preventDefault();
						}
					}).on('click', function(e) {
						document.execCommand('selectAll',false,null)
					});*/


				$('span.typer').typer([
						'<span class="light">put </span>allround coder',
						'<span class="light">put </span>creative developer',
						'<span class="light">draw </span>logo.svg'
					], { endless: false, delay: 1500 });

				this.workflowView = new WorkflowView().render();
				this.chartView = new ChartView().render();
			}


		});
		
		return new indexView();
	});