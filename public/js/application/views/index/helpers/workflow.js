define([
	'jquery',
	'underscore',
	'backbone'
], function( $, _, Backbone ) {

	var WorkflowView = Backbone.View.extend({

		el: '#workflow',

		initialize: function() {
			_.bindAll(this);
		},

		render: function() {
			var self = this;

			return this;
		},

		clean: function() {
			$(this.el).empty();
		},

		animate: function() {

			this.clean();

			var svg = d3.select($(this.el).get(0)).append("svg")
					.attr("width", "220")
					.attr("height", "220");

				var plot = svg.append('g');

				var rect = plot.append('rect')
					.attr('x', 0.5)
					.attr('y', 20.5)
					.attr('width', 200)
					.attr('height', 130)
					.attr('rx', 16)
					.attr('ry', 16)
					.style('fill', 'transparent')
					.style('stroke', '#777')
					.style('stroke-width', 1)
					.attr("stroke-dasharray", "0 1000");

				var screan = plot.append('rect')
					.attr('x', 15.5)
					.attr('y', 35.5)
					.attr('width', 160)
					.attr('height', 100)
					.attr('rx', 2)
					.attr('ry', 2)
					.style('fill', 'transparent')
					.style('stroke', '#777')
					.style('stroke-width', 1)
					.attr("stroke-dasharray", "0 1000")
					.attr('dash-offset', '300');

				var line = plot.append("line")
          .attr("x1", 0)
          .attr("y1", 50.5)
          .attr("x2", 0)
          .attr("y2", 50.5)
					.style('stroke', '#999')
					.style('stroke-width', 1);

				var c1 = plot.append("circle")
					.attr("cx", 20)
					.attr("cy", 36)
					.attr("r", 0)
					.style('fill', 'transparent')
					.style('stroke', '#777')
					.style('stroke-width', 1);

				var c2 = plot.append("circle")
					.attr("cx", 40)
					.attr("cy", 36)
					.attr("r", 0)
					.style('fill', 'transparent')
					.style('stroke', '#777')
					.style('stroke-width', 1);

				var c3 = plot.append("circle")
					.attr("cx", 60)
					.attr("cy", 36)
					.attr("r", 0)
					.style('fill', 'transparent')
					.style('stroke', '#777')
					.style('stroke-width', 1);

				var c4 = plot.append("circle")
					.attr("cx", 187)
					.attr("cy", 85)
					.attr("r", 0)
					.style('fill', 'transparent')
					.style('stroke', '#777')
					.style('stroke-width', 1);

				rect.transition()
					.duration(1000)
					.attr("stroke-dasharray", "1000 0")
					.ease("quad-out");

				line.transition()
					.duration(700)
						.attr("x2", 200);

				c1.transition()
					.duration(250)
						.delay(300)
						.attr("r", 6)
						.ease("quad-out");
				c2.transition()
					.duration(250)
						.delay(450)
						.attr("r", 6)
						.ease("quad-out");
				c3.transition()
					.duration(250)
						.delay(600)
						.attr("r", 6)
						.ease("quad-out");

						window.setTimeout(function(){

							plot.transition()
								.duration(500)
								.attr("transform", "rotate(90 98, 98)");

							line.transition()
								.duration(550)
									.attr("x2", 0);

							c1.transition()
								.duration(250)
									.delay(600)
									.attr("r", 0)
									.ease("quad-out");
							c2.transition()
								.duration(250)
									.delay(450)
									.attr("r", 0)
									.ease("quad-out");
							c3.transition()
								.duration(250)
									.delay(300)
									.attr("r", 0)
									.ease("quad-out");
							c4.transition()
								.duration(250)
									.delay(750)
									.attr("r", 6)
									.ease("quad-out");

							screan.transition()
								.duration(1200)
								.delay(900)
								.attr("stroke-dasharray", "1000 0")
								.ease("quad-out");

						}, 2000);

		}

	});

	return WorkflowView;

});
