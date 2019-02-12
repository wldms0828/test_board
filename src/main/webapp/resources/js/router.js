"use strict";
function Session(x){
	sessionStorage.setItem('context',x);
	sessionStorage.setItem('script',x+'/resources/js');
	return {
		context : ()=>{return sessionStorage.getItem('context');},
		script : ()=>{return sessionStorage.getItem('script');}
	};
}