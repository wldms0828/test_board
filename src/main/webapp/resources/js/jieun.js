"use strict";
var jieun=jieun||{};
jieun=(()=>{
	var login=()=>{
		jieun.page.l();
	};
	var add=()=>{
		jieun.page.a();
	};
	return {login:login,
			add:add};
})();
jieun.page={
		l:()=>{
			$('#content').empty();
			$('#content').html('<div class="input_boxs1" style="padding:5%;text-align:center;">'
					+'<div id="login" >'
					+'<p class="bold_p">로그인</p>'
					+'</div>'
					+'ID : <input id="Login_id">'
					+'<br>'
					+'PW : <input id="Login_pass">'
					+'<br>'
					+'<button id="l_btn">로그인</button>'
					+'</div>');
			
			$('#l_btn').click(e=>{
				e.preventDefault();
				if($('#Login_id').val()=='' || $('#Login_pass').val()==''){
					alert('아이디와 비밀번호를 모두 입력해 주세요!');
				}else{
					$.ajax({
						url:$.context()+'/member/login',
						method:'post',
						contentType:'application/json',
						data:JSON.stringify({
							userId:$('#Login_id').val(),
							password:$('#Login_pass').val()
						}),
						success:d=>{
							if(d.idValid==='WRONG'){
								alert('일치하는 ID가 없습니다.');
							}else if(d.pwValid==='WRONG'){
								alert('비밀번호를 잘못 입력하셨습니다');
							}else{
								$.cookie('userId', d.value.bno);
								alert('로그인 성공');
								app.router.main();
							}
						},
						error: (m1,m2,m3)=>{
							alert("error발생");
						}
					});
				}
			}
					
			);
			
		},
		a:()=>{
			$('#content').empty();
			$('#content').html('<div id="input_boxs2" style="text-align:center;">'
					+'<div id="add_form" >'
					+'<p class="bold_p">회원가입</p>'
					+'</div>'
					+'ID : <input id="id_input"></input>'
					+'<br>'
					+'PASSWORD : <input id="pass_input"></input>'
					+'<br>'
					+'비밀번호 확인 : <input id="pass_con_input"></input>'
					+'<br>'
					+'NAME : <input id="name_input"></input>'
					+'<br>'
					+'AGE : <input id="age_input"></input>'
					+'<br>'
					+'<button id="add_btn">회원가입</button>'
					+'</div>');
			
			$('#add_btn').click(e=>{
				e.preventDefault();
				let ck=true;
				let arr=[
					{c:'add_id',i:'#id_input'},
					{c:'add_name',i:'#name_input'},
					{c:'add_pass',i:'#pass_input'},
					{c:'add_pass_con',i:'#pass_con_input'},
					{c:'add_age',i:'#age_input'}					
					];
				$.each(arr,(x,j)=>{
					$('<h7/>').attr({style:'color:red',id:j.c}).appendTo($('.'+j.c));
					if($(j.i).val()==''||$(j.i).val()=='성별'){
						$('#'+j.c).html('필수 값을 입력하세요.');
						ck=false;
					}else{
						$('#'+j.c).html('');
					}
					if(j.c=='add_pass'){
						if($('#pass_input').val()!=$('#pass_con_input').val()){
							//$('#'+j.c).html('비밀번호가 일치하지 않습니다.');	
							alert('비밀번호가 다릅니다.');
							
							ck=false;
						}
					}
					if(j.c=='add_id'){
						if($('#id_input').val()!=''&&$('#id_input').val()<0){
							$('#'+j.c).html('아이디 형식이 올바르지 않습니다.');	
							ck=false;
						}
					}
				});
				if(ck){
					$.ajax({
						url : $.context()+'/member/add',
						method : 'POST',
						contentType : 'application/json',
						data : JSON.stringify({
							userId : $('#id_input').val(),
							password : $('#pass_input').val(),
							name : $('#name_input').val(),
							age  : $('#age_input').val()
						}),
						success : d=>{
							if(d==1){
								alert("회원가입 성공");
								jieun.page.l();
							}
							else{
								alert("회원가입 실패");
							}
						},
						error : (m1,m2,m3)=>{
							alert("error발생");
						}
					});		
				}
				
			});
			
			
			
		}
}