var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivitySchema = new Schema({
	// eMail address
	email: { type: String },

	// Event type
	event: { 
		type: { type: String, required: true },
		success: { type: Boolean, required: true, default: true }
	},

	// Datetime
	date: { type: Date, required: true, default: Date.now },
});

ActivitySchema.virtual("success").set( function( success ) {
	if (!success) {
		this.event.success = false;
	}
});

module.exports = mongoose.model('Activity', ActivitySchema);