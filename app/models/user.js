var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var findOrCreate = require('mongoose-findorcreate');
var _ = require('underscore');

var UserSchema = new Schema({
	// eMail address
	email: { type: String, unique: true },

	// Hash
	hash: { type: String, required: false },

	// Display name
	displayName: { type: String, required: false },

	// External API
	linkedinid: { type: String, required: false },
	facebookid: { type: String, required: false },

	// Name
	name: {
		first: { type: String, required: true },
		last: { type: String, required: true }
	}
});

UserSchema.plugin(findOrCreate);

UserSchema.method('checkPassword', function (password, callback) {
	bcrypt.compare(password, this.hash, callback);
});

UserSchema.static('authenticate', function (username, password, callback) {
	this.findOne({ email: username }, function(err, user) {
		if (err) {
			return callback(err);
		}

		if (!user) {
			return callback(null, false);
		}

		user.checkPassword(password, function(err, passwordCorrect) {
			if (err) {
				return callback(err);
			}
			
			if (!passwordCorrect) {
				return callback(null, false);
			}
			return callback(null, user);
		});
	});
});

UserSchema.virtual('password').set( function(password) {
	var salt = bcrypt.genSaltSync(10);
  this.hash = bcrypt.hashSync(password, salt);
});

UserSchema.static('authLinkedin', function (profile, callback) {
	this.findOrCreate({ 
			linkedinid: profile.id 
		}, {
			email: _.first(profile.emails).value,
			name: {
				first: profile.name.givenName,
				last: profile.name.familyName
			},
			displayName: profile.displayName
		}, function(err, user) {
			if (err) {
				return callback(err);
			}

			if (!user) {
				return callback(null, false);
			}

			return callback(null, user);
	});
});

UserSchema.static('authFacebook', function (profile, callback) {
	this.findOrCreate({ 
			facebookid: profile.id 
		}, {
			email: _.first(profile.emails).value,
			name: {
				first: profile.name.givenName,
				last: profile.name.familyName
			},
			displayName: profile.name.givenName + ' ' + profile.name.familyName
		}, function(err, user) {
			if (err) {
				return callback(err);
			}

			if (!user) {
				return callback(null, false);
			}

			return callback(null, user);
	});
});

module.exports = mongoose.model('User', UserSchema);