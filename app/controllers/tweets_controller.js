var locomotive = require('locomotive');
var Controller = locomotive.Controller;
var _	= require('underscore');
var moment = require('moment');

var Tweet = require('../models/tweet');

var TweetsController = new Controller();
var output;

TweetsController.before('*', function(next) {
	output = [];
});

TweetsController.index = function() {

	var self = this;
	
	Tweet.find({ created_at: { $gte: moment().subtract('hours', 24) }}, null, { sort: { created_at : -1 }},  function(err, activities) {
		if (!err) {
			self.output = activities;
			self.respond({
				'json': { template: 'index' },
				default: { format: 'json' }
			});
		}
	});

};

TweetsController.after('*', function(next) {
	output = null;
	next();
});

module.exports = TweetsController;
