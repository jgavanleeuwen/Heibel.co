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
				//this.drawGraph([4,3,67,25,13,54,41,3,22,56]);

				this.tweetCollection = new TweetCollection();
				this.tweetCollection.fetch({
					success: function(collection, xhr, response) {
						
						self.happyTweets = _.toArray(_.countBy(_.pluck(_.reject(_.pluck(collection.models, 'attributes'), function(m) {
							return m.sentiment > 0;
						}), 'created_at'), function(d) {
							return new Date(d).getHours();
						}));

						self.sadTweets = _.toArray(_.countBy(_.pluck(_.reject(_.pluck(collection.models, 'attributes'), function(m) {
							console.log(m.text);
							return m.sentiment <= 0;
						}), 'created_at'), function(d) {
							return new Date(d).getHours();
						}));

						self.drawGraph(self.happyTweets);
					}
				});
				
			},

			drawGraph: _.once(function( data ) {
				var x = d3.scale.linear().domain([0, _.size(data)]).range([0, 400]);
				var y = d3.scale.linear().domain([0, _.max(data)]).range([0, 140]);

				var graph = d3.select('#lines').append("svg")
					.attr("width", "374")
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
					.style("stroke-width", 3)
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
					.style("stroke-width", 3);

				graph.selectAll("circle") 
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

				var totalLength = path.node().getTotalLength();

				/*window.setInterval( function() {
*/			var self = this;
				var mood = true;
				var arr;

				window.setInterval(function(){

					if( mood ) {
						arr = self.sadTweets;
					} else {
						arr = self.happyTweets;
					}
					mood = !mood;

					path2.transition()
						.attr("d", line(arr))
							.duration(250)

					path.transition()
						.attr("d", line(arr))
							.duration(250)

					a.transition()
						.attr('d', area(arr))
							.duration(250)

				}, 2000);

				path
					.attr("stroke-dasharray", totalLength + " " + totalLength)
					.attr("stroke-dashoffset", totalLength)
					.transition()
						.delay(400)
						.duration(400)
						.ease("linear")
						.attr("stroke-dashoffset", 0);

				path2
					.attr("stroke-dasharray", totalLength + " " + totalLength)
					.attr("stroke-dashoffset", totalLength)
					.transition()
						.delay(400)
						.duration(400)
						.ease("linear")
						.attr("stroke-dashoffset", 0);
			})


		});
		
		return new indexView();
	});