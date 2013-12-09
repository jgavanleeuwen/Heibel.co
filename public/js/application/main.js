require([
	"backbone",
	"app",
	"router",
	"events/dispatcher",
	"scrollto",
	"waypoints"
],
function(Backbone, App, Router, Dispatcher, ScrollTo, Waypoints) {

	App.router = new Router();
	Backbone.history.start({ pushState: true, root: '' });

	$(document).on("click", "a[href]:not([data-bypass])", function(evt) {

		var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
		var root = location.protocol + "//" + location.host;

		if (href.prop.slice(0, root.length) === root) {
			evt.preventDefault();
			Backbone.history.navigate(href.attr, false);
		}

	});

	$(".navbar a[href^='#']").click( function(e) {
		e.preventDefault();
		$.scrollTo($(this).attr('href'), 250, {axis: 'y', offset: {top:-50} });
	});

	$('section').waypoint(function(direction) {
		$(this).addClass('viewport');
		Dispatcher.trigger('waypoint', { id: $(this).attr('id')});
	}, { offset: 800 });

	$('body').scrollspy({ target: '.navbar', offset: 51 });



});