var GoogleSpreadsheet = require("google-spreadsheet");
var worksheet = new GoogleSpreadsheet('0Ap-lhisIMCMtdDVKZWFRd0R2NU1HU2NWUTI0Rno5bHc');
var google_config = require('../config.json').google;
var colors = require('colors');

var cms = require('../../app/lib/cms');

module.exports = function(next) {

	var self = this;

	worksheet.setAuth(google_config.username, google_config.password, function(err){
		worksheet.getInfo( function( err, sheet_info ){
			sheet_info.worksheets[0].getCells( function( err, cells ){
				if (!err) {
					console.log('   info  -'.cyan + ' google spreadsheets started');
				}
				cms.set(cells, function(err) {
					if (err) {
						// Fallback on JSON?
					}
				});
				next();
			});
		});
	});
};
