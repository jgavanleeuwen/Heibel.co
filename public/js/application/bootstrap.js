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

		// Retina
		retina: '../plugins/retina/retina-1.1.0.min',

		// D3
		d3: 'http://d3js.org/d3.v3.min',

		// Waypoints
		waypoints: '../plugins/waypoints/waypoints',

		// Flatshadow
		typer: '../plugins/typer/jquery.typer'
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