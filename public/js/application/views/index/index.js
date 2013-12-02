define([
	'jquery',
	'underscore',
	'backbone',
	'getbootstrap',
	'modernizr',
	'events/dispatcher',
	'd3',
	'collections/tweets',
	'collections/activities'
], function($, _, Backbone, GetBootstrap, Modernizr, Dispatcher, D3, TweetCollection, ActCollection) {
		var indexView = Backbone.View.extend({
			el: 'body',

			initialize: function() {

				_.bindAll(this);

				
			},

			render: function() {

				var self = this;

				this.template = this.$el.html();
				this.tweetCollection = new TweetCollection();
				this.tweetCollection.fetch({
					success: function(collection, xhr, response) {
						self.tweetGraph(_.toArray(_.countBy(_.pluck(_.pluck(collection.models, 'attributes'), 'created_at'), function(d) {
							return new Date(d).getHours();
						})));
					}
				});
				this.actCollection = new ActCollection();
				this.actCollection.fetch({
					success: function(collection, xhr, response) {
						self.actGraph(_.toArray(_.countBy(_.pluck(_.pluck(collection.models, 'attributes'), 'date'), function(d) {
							return new Date(d).getMinutes();
						})));
					}
				});

				var width = 100;
				var height = 90;
				var τ = 2 * Math.PI;

				var arc = d3.svg.arc()
					.innerRadius(25)
					.outerRadius(40)
					.startAngle(0);

				svg = d3.select("#pie").append("svg")
					.attr("width", width)
					.attr("height", height)
					.append("g")
					.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

				var foreground = svg.append("path")
					.datum({startAngle: 0, endAngle: 0 * τ})
					.style("fill", "#CCC")
					.attr("d", arc)
					.attr("rx", 4);

				foreground.transition()
					.delay(200)
					.duration(750)
					.call(arcTween, 0.78 * τ);

				function arcTween(transition, newAngle) {
					transition.attrTween("d", function(d) {
						var interpolate = d3.interpolate(d.endAngle, newAngle);

						return function(t) {
							d.endAngle = interpolate(t);
							return arc(d);
						};
					});
				}
			},

			actGraph: function( data ) {
				var reset = [0,0,0,0,0,0,0,0];
				
				var x = d3.scale.linear().domain([0, _.size(reset)]).range([0, 220]);
				var y = d3.scale.linear().domain([0, _.max(data)]).range([0, 80]);

				var svg = d3.select('#graph').append('svg')
					.attr('width', data.length * 30)
					.attr('height', 90);
				svg.selectAll("rect")
						.data(reset)
					.enter().append("rect")
						.attr("x", function(d, i) { return x(i); })
						.attr("y", function(d, i) { return 90 - y(d); })
						.attr("width", 20)
						.attr("height", function(d, i) { return d * 10; })
						.attr("rx", 4)
						.attr("ry", 4)
						.style("fill", "#CCC");
				svg.selectAll("rect")
						.data(data)
					.transition()
						.duration(300)
						.delay( function(d, i){ return i * 30; })
						.ease('back-out')
						.attr("height", function(d, i) { return y(d) + 0.5; })
						.attr("y", function(d, i) { return 90 - y(d); });			
			},

			tweetGraph: function( data ) {
				var x = d3.scale.linear().domain([0, _.size(data)]).range([0, 220]);
				var y = d3.scale.linear().domain([0, _.max(data)]).range([0, 80]);

				var graph = d3.select('#lines').append("svg")
					.attr("width", "100%")
					.attr("height", "100%");

				var line = d3.svg.line()
					.x(function(d,i) { return x(i); })
					.y(function(d) { return 95 - y(d); })
					.interpolate("cardinal");

				var path = graph.append("path")
					.attr("d", line(data))
					.style("fill", "none")
					.style("stroke", "#CCC")
					.style("stroke-width", 4);

				graph.selectAll("circle") 
						.data(data)
					.enter().append("circle") 
						.attr("cx", function(d, i) { return x(i); }) 
						.attr("cy", function(d) { return 95 - y(d); }) 
						.attr("r", 4)
						.attr("opacity", 0) 
						.on("mouseover", function(d) { console.log(d); });

				var totalLength = path.node().getTotalLength();

				path
					.attr("stroke-dasharray", totalLength + " " + totalLength)
					.attr("stroke-dashoffset", totalLength)
					.transition()
						.delay(400)
						.duration(400)
						.ease("linear")
						.attr("stroke-dashoffset", 0);
			}

		});
		
		return new indexView();
	});