require([
	"backbone",
	"app",
	"router",
	"events/dispatcher",
	"scrollto",
	"waypoints"
],
function(Backbone, App, Router, Dispatcher, ScrollTo, Waypoints, FlatShadow) {

	App.router = new Router();
	Backbone.history.start({ pushState: true, root: '' });

	// Some links stay inline
	$(document).on("click", "a[href]:not([data-bypass])", function(evt) {

		var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
		var root = location.protocol + "//" + location.host;

		if (href.prop.slice(0, root.length) === root) {
			evt.preventDefault();
			Backbone.history.navigate(href.attr, false);
		}
	});

	// Scrollto plugin
	$(".navbar a[href^='#']").click( function(e) {
		$.scrollTo($(this).attr('href'), 250, {axis: 'y', offset: {top:-50} });
	});

	// Waypoints plugin
	$('section').waypoint(function(direction) {
		Dispatcher.trigger('waypoint', { id: $(this).attr('id')});
	}, { offset: 100 });

	// Scrollspy plugin
	$('body').scrollspy({ target: '.navbar', offset: 51 });

	// Carousel plugin
	$('#carousel').on('slid.bs.carousel', function(e) {
		Dispatcher.trigger('carousel:slide', {slide: $(this).find('div.active').index()});
	});

});