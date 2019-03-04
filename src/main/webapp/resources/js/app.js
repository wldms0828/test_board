"use strict";
var app = app || {};
app=(()=>{
	var init =x=>{
		$.getScript(x+'/resources/js/router.js',
				()=>{
					$.extend(new Session(x)); 
					app.router.main();
		})
	};
	return {init : init};
})();
app.router={
	main:x=>{
		$.when(
				$.getScript($.script()+'/board.js'),
				$.getScript($.script()+'/mainP.js'),
				$.Deferred(y=>{
						$(y.resolve);
					})
				).done(x=>{
					$('#footer').remove();
					$('#wrapper').html((($.type($.cookie("userId")) === 'undefined')?nav():lnav())+content()).append(footer());
					mainP.home();
					 $('#login_btn').click(e=>{
							e.preventDefault();
							$('#footer').remove();
							jieun.login();
						});
						$('#join_btn').click(e=>{
							e.preventDefault();
							$('.nav-item').removeClass('active');
							$('#join_btn').addClass('active');
							$('#footer').remove();
							jieun.add();
						});
						$('#board_btn').click(e=>{
							e.preventDefault();
							$('.nav-item').removeClass('active');
							$('#board_btn').addClass('active');
							$('#footer').remove();
							$.getScript($.script()+'/board.js', x=>{
                             board.init(); 
                             
                         });
                     });
						$('.go_main').click(e=>{
							e.preventDefault();
							mainP.home();
						});
						
						$('#m_d_page').click(e=>{
							e.preventDefault();
							alert('마이페이지를 구현해 보겠습니다~');
						});
						
						$('#logout_btn').click(e=>{
							e.preventDefault();
							if($.removeCookie('userId')){
								alert('로그아웃되었습니다.');
								mainP.home();
							}else{
								alert('로그아웃 에러났음.');
							}
						});
				})
	}
	
};
var nav =()=> '<div id = "navi" style="height:10%">'
+'<nav class="navbar navbar-expand-lg class="navbar navbar-light" style="background-color: #e3f2fd; height: 100%;">'
+'  <a class="navbar-brand go_main" style="    font-size: -webkit-xxx-large; margin-top: 20px;" ></a>'
+'  <div class="collapse navbar-collapse" id="navbarNavDropdown">'
+'    <ul class="navbar-nav" style=" margin-top: 5px;">'
+'      <li class="nav-item active" style=" font-size: xx-large;">'
+'        <a class="nav-link" id="board_btn">게시판 <span class="sr-only">(current)</span></a>'
+'      </li>'
+'      <li class="nav-item" style=" font-size: xx-large;">'
+'        <a class="nav-link" id="join_btn"></a>'
+'      </li>'
+'      <li class="nav-item" style=" font-size: xx-large;">'
+'        <a class="nav-link" id="login_btn"></a>'
+'      </li>'
+'    </ul>'
+'  </div>'
+'</nav>'
+'</div>';
				
var lnav=()=>' <div id = "navi" style="height:10%">'
+'<nav class="navbar navbar-expand-lg class="navbar navbar-light" style="background-color: #e3f2fd;">'
+'  <a class="navbar-brand" href="#">김지은</a>'
+'  <div class="collapse navbar-collapse" id="navbarNavDropdown">'
+'    <ul class="navbar-nav" style="list-style:none">'
+'      <li class="nav-item active">'
+'        <a class="nav-link" id="board_btn">게시판 <span class="sr-only">(current)</span></a>'
+'      </li>'
+'      <li class="nav-item">'
+'        <a class="nav-link" id="m_d_page">마아페이지</a>'
+'      </li>'
+'      <li class="nav-item">'
+'        <a class="nav-link" id="logout_btn">로그아웃</a>'
+'      </li>'
+'    </ul>'
+'  </div>'
+'</nav>'
+'</div>';
				
var content = () =>'<div id="content"><div/>';

var footer = ()=>'<div id="footer" class="footer-distributed" style="background-color: whitesmoke;">'
+'			<div class="footer-left">'
+'				<h3>jieun board</h3>'
+'				<p class="footer-links">'					
+'					<a href="#">Jieun</a>'
+'				</p>'
+'			</div>'
+'			<div class="footer-center">'
+'				<div>'
+'					<i class="fa fa-map-marker"></i>'
+'				</div>'
+'				<div>'
+'					<i class="fa fa-phone"></i>'
+'					<p>+82 02 707 1480</p>'
+'				</div>'
+'				<div>'
+'					<i class="fa fa-envelope"></i>'
+'					<p><a href="mailto:support@company.com">support@jieuniiiiiii.com</a></p>'
+'				</div>'
+'			</div>'
+'			<div class="footer-right">'
+'				<p class="footer-company-about">'
+'					<span>About us</span>'
+'					Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.'
+'				</p>'
+'				<div class="footer-icons">'
+'					<a href="#"><i class="fa fa-facebook"></i></a>'
+'					<a href="#"><i class="fa fa-twitter"></i></a>'
+'					<a href="#"><i class="fa fa-linkedin"></i></a>'
+'					<a href="#"><i class="fa fa-github"></i></a>'
+'				</div>'
+'			</div>'
+'		</div>';