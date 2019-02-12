"use strict";
var app = app || {};
app=(()=>{
	var init =x=>{
		console.log('지으닝게시판이어요');
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
					$('#wrapper').html((($.type($.cookie("userid")) === 'undefined')?nav():anav())+content()).append(footer());
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
							$.getScript($.script()+'/board.js', ()=>{
                             board.init($.context());
                         });
                     });
				})
	}
	
};
var nav =()=> '<div id = "navi" style="height:20%">'
+'<nav class="navbar navbar-expand-lg class="navbar navbar-light" style="background-color: #e3f2fd;">'
+'  <a class="navbar-brand" href="#">김지은</a>'
+'  <div class="collapse navbar-collapse" id="navbarNavDropdown">'
+'    <ul class="navbar-nav" >'
+'      <li class="nav-item active">'
+'        <a class="nav-link" id="board_btn">게시판 <span class="sr-only">(current)</span></a>'
+'      </li>'
+'      <li class="nav-item">'
+'        <a class="nav-link" id="join_btn">회원가입</a>'
+'      </li>'
+'      <li class="nav-item">'
+'        <a class="nav-link" id="login_btn">로그인</a>'
+'      </li>'
+'    </ul>'
+'  </div>'
+'</nav>'
+'</div>';
				
var lnav=()=>' <div id = "navi" style="height:20%">'
+'<nav class="navbar navbar-expand-lg class="navbar navbar-light" style="background-color: #e3f2fd;">'
+'  <a class="navbar-brand" href="#">김지은</a>'
+'  <div class="collapse navbar-collapse" id="navbarNavDropdown">'
+'    <ul class="navbar-nav" style="list-style:none">'
+'      <li class="nav-item active">'
+'        <a class="nav-link" href="#">게시판 <span class="sr-only">(current)</span></a>'
+'      </li>'
+'      <li class="nav-item">'
+'        <a class="nav-link" href="#">마아페이지</a>'
+'      </li>'
+'      <li class="nav-item">'
+'        <a class="nav-link" href="#">로그아웃</a>'
+'      </li>'
+'    </ul>'
+'  </div>'
+'</nav>'
+'</div>';
				
var content = () =>'<div id="content"><div/>';

var footer = ()=>'<div id="footer" class="footer-distributed">'
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
+'					<p><a href="mailto:support@company.com">support@ouroom.com</a></p>'
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