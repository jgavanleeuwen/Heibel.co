var Activity = require('../models/activity');

module.exports = {
		
		// Log activities
		log: function( args ) {
			var activity = new Activity();

			activity.email = args.email;
			activity.event = {
				type: args.type,
				success: args.success
			};

			activity.save(function (err) {
				if (err) {
					return;
				}

				return;
			});
		}

	};