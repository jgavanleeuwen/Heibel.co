var locomotive = require('locomotive');
var Controller = locomotive.Controller;
var cms = require('../lib/cms');

var IndexController = new Controller();

IndexController.main = function() {

	this.cms = cms;
	this.render();
  
};

module.exports = IndexController;