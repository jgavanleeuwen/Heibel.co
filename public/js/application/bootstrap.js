require.config({
	paths: {
		// Libs
		jquery: 'http://code.jquery.com/jquery-latest.min',
		underscore: '../libs/underscore/underscore.min',
		backbone: '../libs/backbone/backbone.min',

		// Plugins
		scrollto: '../plugins/scrollto/scrollto.min',

		// Twitter Bootstrap
		getbootstrap: '../plugins/bootstrap/bootstrap.min',

		// Modernizr
		modernizr: 'http://modernizr.com/downloads/modernizr-latest',

		// Socket.IO
		socketio: '../plugins/socketio/socket.io.min',

		// D3
		d3: 'http://d3js.org/d3.v3.min',

		// Waypoints
		waypoints: '../plugins/waypoints/waypoints',

		// Typer
		typer: '../plugins/typer/jquery.typer',

		// Typeahead
		typeahead: '../plugins/typeahead/typeahead'
	},
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		getbootstrap: {
			deps: ['jquery']
		},
		scrollto: {
			deps: ['jquery']
		}
	},
	deps: ["main"]
});