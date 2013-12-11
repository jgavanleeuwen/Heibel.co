define([
	'jquery',
	'underscore',
	'backbone',
	'getbootstrap',
	'modernizr',
	'events/dispatcher',
	'd3',
	'collections/tweets'
], function($, _, Backbone, GetBootstrap, Modernizr, Dispatcher, D3, TweetCollection) {
		var indexView = Backbone.View.extend({
			el: 'body',

			initialize: function() {

				_.bindAll(this);

				Dispatcher.on('waypoint', this.onWaypointHandler);				
			},

			onWaypointHandler: function( attrs ) {
				switch( attrs.id ) {
					case 'tech':
						
						break;
				}
			},

			render: function() {

				var self = this;

				this.template = this.$el.html();
				this.tweets = [];

				this.tweetCollection = new TweetCollection();
				this.tweetCollection.fetch({
					success: function(collection, xhr, response) {
						
						self.tweets.push(_.toArray(_.countBy(_.pluck(_.reject(_.pluck(collection.models, 'attributes'), function(m) {
							return m.sentiment > 0;
						}), 'created_at'), function(d) {
							return new Date(d).getHours();
						})));

						self.tweets.push(_.toArray(_.countBy(_.pluck(_.reject(_.pluck(collection.models, 'attributes'), function(m) {
							return m.sentiment <= 0;
						}), 'created_at'), function(d) {
							return new Date(d).getHours();
						})));

						self.tweets.push(_.toArray(_.countBy(_.pluck(_.reject(_.pluck(collection.models, 'attributes'), function(m) {
							return m.sentiment == 0;
						}), 'created_at'), function(d) {
							return new Date(d).getHours();
						})));

						self.drawGraph(self.tweets[0]);
					}
				});

				this.drawFlow();
				
			},

			drawFlow: _.once(function() {

				var svg = d3.select('#workflow').append("svg")
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
					.attr("stroke-dasharray", "0 1000");

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
								.attr("transform", "rotate(90 95, 100)");

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


			}),

			drawGraph: _.once(function( data ) {
				var x = d3.scale.linear().domain([0, _.size(data)]).range([5, 400]);
				var y = d3.scale.linear().domain([0, _.max(data)]).range([0, 140]);

				var graph = d3.select('#lines').append("svg")
					.attr("width", "370")
					.attr("height", "300");

				var filter = graph.append("defs")
					.append("filter")
						.attr("id", "blur")
						.attr('height', "250px")
					.append("feGaussianBlur")
						.attr("stdDeviation", 16);

				var line = d3.svg.line()
					.x(function(d,i) { return x(i); })
					.y(function(d) { return 155 - y(d); });

				var line2 = d3.svg.line()
					.x(function(d,i) { return x(i) + 10; })
					.y(function(d) { return 160 - y(d); });

				var path = graph.append("path")
					.attr("d", line2(data))
					.style("fill", "none")
					.style("stroke", "#000")
					.style("stroke-width", 4)
					.attr('filter', 'url(#blur)')

				var area = d3.svg.area()
					.x(function(d, i) { return x(i) })
					.y0(0)
					.y1(function(d) { return 155 - y(d); });

				var a = graph.append('path')
					.datum(data)
					.attr('class', 'area')
					.attr('d', area);
	
				var path2 = graph.append("path")
					.attr("d", line(data))
					.style("fill", "none")
					.style("stroke", "#FFF")
					.style("stroke-width", 4)
					.style("stroke-linecap", "round")
					.style("stroke-linejoin", "round");

				/*graph.selectAll("circle") 
						.data(data)
					.enter().append("circle") 
						.attr("cx", function(d, i) { return x(i); }) 
						.attr("cy", function(d) { return 155 - y(d); }) 
						.attr("r", 4)
						.attr('fill', '#DDD')
						.style("stroke", '#FFF')
						.style("stroke-width", 3)
						.attr("opacity", 0) 
						.on("mouseover", function(d) { console.log(d); });
*/
				var totalLength = path.node().getTotalLength();

				var self = this;
				var mood = true;
				var arr;
				var i = 1;

				window.setInterval(function(){

					arr = self.tweets[i];
					i++;
					if(i == 3) {
						i = 0;
					}

					path2.transition()
						.attr("d", line(arr))
							.duration(400)

					path.transition()
						.attr("d", line(arr))
							.duration(400)

					a.transition()
						.attr('d', area(arr))
							.duration(400)

				}, 2000);

				path
					.attr("stroke-dasharray", totalLength + " " + totalLength)
					.attr("stroke-dashoffset", totalLength)
					.transition()
						.delay(400)
						.duration(600)
						.ease("linear")
						.attr("stroke-dashoffset", 0);

				path2
					.attr("stroke-dasharray", totalLength + " " + totalLength)
					.attr("stroke-dashoffset", totalLength)
					.transition()
						.delay(400)
						.duration(600)
						.ease("linear")
						.attr("stroke-dashoffset", 0);
			})


		});
		
		return new indexView();
	});