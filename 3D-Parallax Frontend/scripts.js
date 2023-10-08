document.addEventListener('mousemove', function (e) {
    var wx = window.innerWidth;
    var wy = window.innerHeight;

    var x = e.pageX - window.scrollX;
    var y = e.pageY - window.scrollY;

    var newx = x - wx ;
    var newy = y - wy ;

    document.querySelectorAll('#wrapper .p1, #wrapper .p2, #wrapper .p3, #wrapper .letra').forEach(function (element) {
        var speed = parseFloat(element.getAttribute('data-speed')) || 0;
        element.style.transform = 'translate(' + (1 - newx * speed) + 'px, ' + (1 - newy * speed) + 'px)';
    });
});


// codigo con jquery y gsap
// $('html').mousemove(function(e){
		
// 		var wx = $(window).width();
// 		var wy = $(window).height();
		
// 		var x = e.pageX - this.offsetLeft;
// 		var y = e.pageY - this.offsetTop;
		
// 		var newx = x - wx/2;
// 		var newy = y - wy/2;
		
// 		$('span').text(newx + ", " + newy);
		
// 		$('#wrapper div').each(function(){
// 			var speed = $(this).attr('data-speed');
// 			if($(this).attr('data-revert')) speed *= -1;
// 			TweenMax.to($(this), 1, {x: (1 - newx*speed), y: (1 - newy*speed)});
			
// 		});
		
// 	});