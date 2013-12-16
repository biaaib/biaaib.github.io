$(document).ready(init);

function init() {
	/* ========== DRAWING THE PATH AND INITIATING THE PLUGIN ============= */

	$.fn.scrollPath("getPath")
		// Move to 'start' element
		.moveTo(400, 200, {name: "start"})
		// Line to 'description' element
		.lineTo(400, 1200, {name: "description"})
 		.lineTo(400, 2000, {name: "university"})
		// Arc down and line to 'syntax'
		.arc(400, 2700, 700, -Math.PI/2, Math.PI/2, true)
		.lineTo(400, 3400, {name: "honour"})
		.lineTo(2400, 3400, {name: "loves"})
		.lineTo(2400, 2400, {name: "enjoy"})
		.lineTo(2400, 200, {name: "contact"})
		.lineTo(400, 200);


	// We're done with the path, let's initate the plugin on our wrapper element
	$(".wrapper").scrollPath({drawPath: true, wrapAround: true});

	// Add scrollTo on click on the navigation anchors
	$("nav").find("a").each(function() {
		var target = $(this).attr("href").replace("#", "");
		$(this).click(function(e) {
			e.preventDefault();
			
			// Include the jQuery easing plugin (http://gsgd.co.uk/sandbox/jquery/easing/)
			// for extra easing functions like the one below
			$.fn.scrollPath("scrollTo", target, 1000, "easeInOutSine");
		});
	});
}


function ordinal(num) {
	return num + (
		(num % 10 == 1 && num % 100 != 11) ? 'st' :
		(num % 10 == 2 && num % 100 != 12) ? 'nd' :
		(num % 10 == 3 && num % 100 != 13) ? 'rd' : 'th'
	);
}
