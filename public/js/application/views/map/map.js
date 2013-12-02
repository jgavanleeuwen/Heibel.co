define([
	'jquery',
	'underscore',
	'backbone',
	'getbootstrap',
	'modernizr',
	'events/dispatcher',
	'd3',
	'events/sockets',
	'collections/tweets'
], function($, _, Backbone, GetBootstrap, Modernizr, Dispatcher, D3, SocketEvents, TweetCollection) {
		var mapView = Backbone.View.extend({
			el: 'body',

			initialize: function() {
				_.bindAll(this);				
			},

			render: function() {
				var self = this;

				this.mapOptions = {
					center: new google.maps.LatLng(51.990800, 5.130615),
					zoom: 3,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};
				this.geocoder = new google.maps.Geocoder();
				this.map = new google.maps.Map( $('#mapholder').get(0), self.mapOptions);
				this.infowindow = new google.maps.InfoWindow();

				SocketEvents.init('http://localhost:3001');

				this.tweetCollection = new TweetCollection();
				this.tweetCollection.on('add', this.onModelAddHandler);
				this.tweetCollection.fetch({
					error: function(collection, xhr, error) {
						console.log(error);
					}
				});

				Dispatcher.on('tweet', function(args) {
					self.tweetCollection.fetch();
				});
			},

			onModelAddHandler: function(m) {
				var self = this;

				this.geocoder.geocode({address: m.get('user').location}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						var marker = new google.maps.Marker({
							position: results[0].geometry.location,
							map: self.map,
							animation: google.maps.Animation.DROP,
							text: m.get('text')
						});
						google.maps.event.addListener(marker, 'click', function() {
							self.infowindow.setContent(marker.text);
							self.infowindow.open(self.map, marker);
						});
					}
				});
			}

		});
		
		return new mapView();
	});