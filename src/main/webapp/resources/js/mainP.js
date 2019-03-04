"use strict";
var mainP = mainP || {};
mainP=(()=>{
	var home = ()=>{
		mainP.page.h();
	};
	 return { home : home };

})();
mainP.page={
		h:()=>{
			$('#content').empty();
			$('<img/>').addClass('main_img').attr({src:'resources/img/board.jpg'}).appendTo($('#content'));
	    	$('<div/>').addClass('container').attr({id:"h_main"}).appendTo($('#content'));
		}
};