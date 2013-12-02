var locomotive = require('locomotive');
var Controller = locomotive.Controller;
var User = require('../models/user');
var Mailer = require('../lib/mailer');

var AccountController = new Controller();

AccountController.show = function() {

	if (!this.req.isAuthenticated()) {
		this.render('new');
	} else {	
		this.user = this.req.user;
		this.render();
	}
};

AccountController.new = function() {
	this.render();
};

AccountController.edit = function() {
	this.user = this.req.user;
	this.render();
};

AccountController.update = function() {
	var self = this;

	User.update({ 
		_id: this.param('_id') 
	}, {
		$set : {
			email: self.param('email'),
			name : {
				first: self.param('firstname'),
				last: self.param('lastname')
			}
		}
	}, function(err, user) {
		if (err) {
			console.log(err);
			self.render('edit');
		} else {
			self.render('emails/welcome', { user: self.req.user }, function(err, html) {
				Mailer.sendMail({ 
					html: html,
					subject: 'Welkom!',
					user: self.req.user,
				}, function(err, success) {
					if (err) {
						console.log(err.message);
					}
				});
			});

			self.user = self.req.user;
			self.render('show');
		}
	});
};

AccountController.create = function() {
	var self = this;

	User.create({
		email: self.param('email'),
		password: self.param('password'),
		name: {
			first: self.param('firstname'),
			last: self.param('lastname')
		},
		displayName: self.param('firstname') + ' ' + self.param('lastname')
	}, function(err, model) {
		if (err) {
			self.redirect(self.urlFor({ action: 'new' }));
		}
		return self.redirect('/');
	});
};

module.exports = AccountController;