//= require jquery
//= require_tree .
$(document).ready(function(){
	$('.bg-gray').hover(function(){
		$(this).addClass('bg-coloranimation');
	},function(){
		$(this).removeClass('bg-coloranimation');
	});
	$('.slideDown').on('click',function(){
		$(this).toggleClass('active');
		$(this).parents('.schedule-body').next('.schedule-footer').toggleClass('active');
	});
	$('.slash').on('click',function(){
		$('[data-schedule]').addClass('hidden-xs').eq($(this).index()).toggleClass('hidden-xs');

	});
		
});