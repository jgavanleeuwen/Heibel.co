define([
	'jquery',
	'underscore',
	'backbone',
	'collections/tweets'
], function( $, _, Backbone, TweetCollection ) {

	var ChartView = Backbone.View.extend({

		el: '#lines',

		initialize: function() {
			_.bindAll(this);

			this.tweets = [];

			var self = this;

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
						return m.sentiment === 0;
					}), 'created_at'), function(d) {
						return new Date(d).getHours();
					})));

					self.animate();
				}
			});


		},

		render: function() {
			var self = this;

			return this;
		},

		clean: function() {
			$(this.el).empty();
		},

		animate: function() {

			var data = this.tweets[0];

			this.clean();

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
				.attr('filter', 'url(#blur)');

			var area = d3.svg.area()
				.x(function(d, i) { return x(i); })
				.y0(0)
				.y1(function(d) { return 155 - y(d); });

			var a = graph.append('path')
				.datum(data)
				.style('fill', '#DDD')
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
						.duration(400);

				path.transition()
					.attr("d", line(arr))
						.duration(400);

				a.transition()
					.attr('d', area(arr))
						.duration(400);

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


		}

	});

	return ChartView;

});
