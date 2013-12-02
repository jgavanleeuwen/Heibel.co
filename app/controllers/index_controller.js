var locomotive = require('locomotive');
var Controller = locomotive.Controller;

var IndexController = new Controller();

IndexController.main = function() {

	this.user = this.req.user;
	this.message = this.req.flash();

  this.render();
};

module.exports = IndexController;
