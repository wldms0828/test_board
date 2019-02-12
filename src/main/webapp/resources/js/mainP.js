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
			$('#content').html('김지은 게시판');
	    	$('<div/>').addClass('container').attr({id:"h_main"}).appendTo($('#content'));
		}
};