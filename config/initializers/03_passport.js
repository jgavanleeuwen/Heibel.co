var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

var User = require('../../app/models/user');
var Activity = require('../../app/models/activity');

var linkedin_config = require('../config.json').linkedin;
var facebook_config = require('../config.json').facebook;


passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
 done(null, obj);
});

passport.use(new LinkedInStrategy(
	linkedin_config, 
function(token, tokenSecret, profile, done) {
	
	User.authLinkedin(profile, function(err, user) {
		Activity.create({ email: user.email, event: { type: 'login', success: user } }, function (err, model) {
			if (err) console.log(err);
		});

		return done(err, user);
	});
}));

passport.use(new FacebookStrategy(
	facebook_config,
function(token, tokenSecret, profile, done) {
	console.log(profile);

	User.authFacebook(profile, function(err, user) {

		Activity.create({ email: user.email, event: { type: 'login', success: user } }, function (err, model) {
			if (err) console.log(err);
		});

		return done(err, user);
	});
}));

passport.use(new LocalStrategy(
	function(username, password, done) {
		User.authenticate(username, password, function(err, user) {

			Activity.create({ email: username, event: { type: 'login'}, success: user }, function (err, model) {
				if (err) console.log(err);
			});

			return done(err, user);
		});
	}
));
