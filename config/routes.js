var passport = require('passport');

// Draw routes.  Locomotive's router provides expressive syntax for drawing
// routes, including support for resourceful routes, namespaces, and nesting.
// MVC routes can be mapped mapped to controllers using convenient
// `controller#action` shorthand.  Standard middleware in the form of
// `function(req, res, next)` is also fully supported.  Consult the Locomotive
// Guide on [routing](http://locomotivejs.org/guide/routing.html) for additional
// information.
module.exports = function routes() {
	this.root('index#main');

	this.match('/login/linkedin', passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] }),
		function(req, res){
			// The request will be redirected to LinkedIn for authentication, so this
			// function will not be called.
		}
	);

	this.match('/login/facebook', passport.authenticate('facebook', { scope: 'email' }),
		function(req, res){
			// The request will be redirected to Facebook for authentication, so this
			// function will not be called.
		}
	);

	this.match('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

	this.match('/login/local', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: 'Oops! Invalid password/username', successFlash: 'Hi there' }), { via: 'POST'});
	this.match('/login/linkedin/callback', passport.authenticate('linkedin', { successRedirect: '/', failureRedirect: '/login', successFlash: 'Hi there' }));
	this.match('/login/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login', successFlash: 'Hi there' }));

	this.resources('login');
	this.resource('account');
	this.resources('tweets');
};