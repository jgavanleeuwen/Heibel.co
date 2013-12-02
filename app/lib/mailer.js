var _ = require('underscore');
var nodemailer = require('nodemailer');
var smtp_config = require('../../config/config.json').smtp;

module.exports = {
		
	sendMail: function( args, callback ) {
		return true;
		var transport = nodemailer.createTransport("SMTP", smtp_config);

		var message = {
			from: 'Jeroen van Leeuwen <jgavanleeuwen@gmail.com>',
			to: '"Receiver Name" <jgavanleeuwen@outlook.com>',
			subject: 'Nodemailer is unicode friendly ✔',
			headers: {
					'X-Laziness-level': 1000
			},

			// plaintext body
			text: 'Hello to myself!',

			// HTML body
			html: args.html,

			// An array of attachments
			attachments: []
		};

		transport.sendMail(message, function(error){
			if( typeof callback === 'function') {
				callback(error);
			}
		});

		return true;

	}

};