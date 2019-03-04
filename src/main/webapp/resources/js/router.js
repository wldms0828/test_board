"use strict";
function Session(x){
	sessionStorage.setItem('context',x);
	sessionStorage.setItem('script',x+'/resources/js');
	sessionStorage.setItem('img',x+'/resources/img');
	return {
		context : ()=>{return sessionStorage.getItem('context');},
		img : ()=>{return sessionStorage.getItem('img');},
		script : ()=>{return sessionStorage.getItem('script');}
	};
}