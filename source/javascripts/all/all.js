//= require jquery
//= require_tree .
$(document).ready(function(){
	$('.bg-gray').hover(function(){
		$(this).addClass('bg-coloranimation');
	},function(){
		$(this).removeClass('bg-coloranimation');
	});
	$('.schedule-header > span').text();
		
});