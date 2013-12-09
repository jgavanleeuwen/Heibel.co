var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TweetSchema = new Schema({

	// Date
	created_at: { type: Date, required: true, default: Date.now },

	// Text
	text: { type: String, required: true },

	// User
	user: { 
		id: { type: Number },
		screen_name: { type: String, required: true },
		location: { type: String }
	},

	sentiment: { type: Number }

});

module.exports = mongoose.model('Tweet', TweetSchema);