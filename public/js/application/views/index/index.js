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
			views: {},

			initialize: function() {

				_.bindAll(this);

				Dispatcher.on('carousel:slide', this.onCarouselSlideHandler);
			},

			onCarouselSlideHandler: function(attrs) {
				switch( attrs.slide ){
					case 0:
						this.views.chartView.animate();
						break;
					case 1:
						this.views.workflowView.animate();
						break;
				}
			},

			render: function() {

				var self = this;

				$('span.typer')
					.on('keydown', function(e) {
						if (e.keyCode === 13) {
							e.preventDefault();
							var txt = $(this).text();
							if(txt.indexOf('find') === 0) $.scrollTo($('*:contains("' + txt.replace('find ', '') + '")').last(), 250, {axis: 'y', offset: {top:-100} });
							if(txt.indexOf('go' === 0))	$.scrollTo('#' + $(this).text().replace('go', '').replace(/^\s+|\s+$/g, ''), 250, {axis: 'y', offset: {top:-50} });
							if (txt.indexOf('help') === 0) {
								$(this).typer([
									'<span class="light">type </span>go ..<span class="light"> to navigate </span>',
									'<span class="light">type </span>find ..<span class="light"> to search </span>',
									'<span class="light">put </span>Heibel.co'
								], { endless: false, delay: 300 });
							}
						}
					}).on('click', function(e) {
						document.execCommand('selectAll',false,null);
						$(this).attr('title', 'Type help for options').tooltip('fixTitle').tooltip('show');
					});


				$('span.typer').typer([
						'<span class="light">put </span>creative backender',
						'<span class="light">log </span>fast frontender',
						'<span class="light">put </span>Heibel.co'
					], { endless: false, delay: 1500 });

				$('span.typer, a[data-toggle="tooltip"]').tooltip();

				this.views.workflowView = new WorkflowView().render();
				this.views.chartView = new ChartView().render();
			}


		});
		
		return new indexView();
	});