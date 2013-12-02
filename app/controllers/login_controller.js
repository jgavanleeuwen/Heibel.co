var locomotive = require('locomotive');
var Controller = locomotive.Controller;

var LoginController = new Controller();

LoginController.index = function() {

	this.message = this.req.flash();
	this.render();
};

module.exports = LoginController;

