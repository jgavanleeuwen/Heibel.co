var Twit = require('twit');
var sentiment = require('sentiment');
var Tweet = require('../../app/models/tweet');
var twitter_config = require('../config.json').twitter;
var colors = require('colors');

module.exports = function() {
	
	var T = new Twit(twitter_config);

	var stream = T.stream('statuses/filter', { track: ['#nodejs', '#rails', '#php'], language: ['en', 'nl'] });
	var self = this;

	stream.on('tweet', function (tweet) {
		sentiment(tweet.text, function(err, result){
			console.log(result);
			Tweet.create({ 
					created_at: tweet.created_at,
					text: tweet.text,
					user: {
						id: tweet.user.id,
						screen_name: tweet.user.screen_name,
						location: tweet.user.location
					},
					sentiment: result.score
				}, function (err, model) {
					if (err){
						console.log(err);
					}
				}
			);
		});
	});

	stream.on('connect', function() {
		console.log('   info  -'.cyan + ' twitter started');
	});

	stream.on('disconnect', function() {
		console.log('   info  -'.red + ' twitter disconnected');
	});

};