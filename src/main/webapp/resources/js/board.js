"use strict";

var board = board || {};
board = (()=>{
	var init=()=>{
		board.page.list({l:'none',w:'e@5XdE6^'});
	};
	return {init:init}
})();
board.page={
		list:x=>{
		if(x.l=="none"&&x.w=='e@5XdE6^'){x.l=1;}
		console.log('x.w',x.w);
		console.log('x.l',x.l);
		$.getJSON($.context()+'/board/list/'+x.l+'/'+x.w,d=>{
			$('#content').html('<div id="list_table" style="padding: 2%; ">'
					+'<button id="write_btn" style="float: right; margin-bottom: 5%; "> 글쓰기 </button>'
					+'		<div id="w_table">'
					+'          <table class="table table-bordered" style="margin-top: 2%;">'
					+'            <tr id="board_tr_th">'
					+'              <th id="th_c" style="width: 10px">BNO</th>'
					+'              <th id="th_c">TITLE</th>'
					+'              <th id="th_c">WRITER</th>'
					+'              <th id="th_c">REGDATE</th>'
					+'              <th id="th_c" style="width: 40px">VIEWCNT</th>'
					+'            </tr>'					
					+'          </table>'
					+'		</div>'
					+'</div>');
			
			 $.each(d.list,(idx,y)=>{
				 if(y.lev==1){
					 
				 }
				 $('<tr>').append(
						 
						 $('<td id="d_bno" class="d_t" style="    padding-top: 16px;">').html(y.rnum),
						 $('<td id="d_title" style="cursor:pointer;width: 50%;" >').html('<p style="margin:0; padding-top: 4px; "><pre id="t_t_w">'+y.title+'</pre></p>').click(e=>{
							 board.page.d(y.bno);
						 }),
						 $('<td id="d_writer" class="d_t" stlye="    padding-top: 12px;">').html('<pre id="t_t_w">'+y.writer+'</pre>'),
						 $('<td id="d_regdate" class="d_t" style="    padding-top: 16px;">').html(y.regdate),
						 $('<td id="d_viewcnt" class="d_t"  style="    padding-top: 17px;">').html(y.viewCnt)
						 
				 ).appendTo($('tbody'));
				 console.log('lev :: ',y.lev);
				 
			});
			 
			$('<div id="b_search" style="padding-bottom: 4%;">').appendTo($('#content'));
			$('#b_search').html('<input type="text" id="s_word" placeholder="검색어를 입력해 주세요."></input>'
					+'<button id="s_btn">검색</button>');
			
			var word_1 = new Array();
			$('#s_word').keyup(function (e){
			    var word = $(this).val();
			    let w_blank =/[\s]/g;
			    if(w_blank.test(word)){
			    	alert('공백은 입력할 수 없습니다.');
			    	console.log('w_blank',w_blank.test(word));
			    	$(this).val(word.substring(0, 0));
			    }
			    word_1 =  word.replace(/&/gi,'&amp;');
				console.log('else2 :: ',word_1);
			});
			
			

			$('#s_btn').click(e=>{
				e.preventDefault();
				
				if($('#s_word').val()==''||$('#s_word').val()==null||$('#s_word').val()==$.trim($('#s_word').val())==''){
					alert('검색어를 입력해 주세요');
				}else{
					console.log('else :: ',$('#s_word').val());
					console.log('else3 :: ',word_1);
					board.page.list({"w":word_1,"l":1});
				}
			});
			
			/* $('#write_btn').click(e=>{
				 if($.type($.cookie("userId")) === 'undfined'){
					 console.log('$.type($.cookie("userId")) : ',$.type($.cookie("userId")));
					 alert('회원전용 페이지 입니다.');
					 jieun.page.l();
				 }else{
					 board.page.write();
				 }
			 });*/
			 $('#write_btn').click(e=>{
				 e.preventDefault();
				 board.page.write();
			 });
			
			 
			 $('<div id="list_pagination" style="text-align:center;">').html('<nav>'
					 +'  <ul class="pagination">'
					 +'  </ul>'
					 +'</nav>').appendTo($('#content'));
			 
			 for (let i = d.page.beginPage;i<=d.page.endPage;i++){
				 
				 let ac =(i==d.page.pageNum)? "active":"";
				 $('<li/>').addClass('page-item '+ac).append($('<a/>').addClass('page-link').html(i)).appendTo($('.pagination')).click(e=>{
					 e.preventDefault();
					 $('#list_pagination').remove();
					 board.page.list({"w":x.w ,"l":i});
					});
			 }
			 
			 let disp = (d.page.existPrev)? "": "hidden" ;
			 let disn = (d.page.existNext)? "": "hidden" ;
			 
			 $('<li id="pre" />').addClass("page-item "+disp).append($('<a/>').addClass("page-link").html("<"))
				.click(e=>{
					 $('#list_pagination').empty();
					 board.page.list({"l":d.page.beginPage-1,"w":x.w});
				}).prependTo($('.pagination'));
			$('<li id="next" />').addClass("page-item "+disn).append($('<a/>').addClass("page-link").html(">"))
				.click(e=>{
					 $('#list_pagination').empty();
					 board.page.list({"l":d.page.endPage+1,"w":x.w});
				})
				.appendTo($('.pagination'));
			
			let first = (d.page.firstPage)? "" : "hidden";
			let last = (d.page.lastPage)? "" : "hidden";
			console.log('d.page.lastPage',d.page.lastPage);
			 $('<li id="first" />').addClass("page-item "+first).append($('<a/>').addClass("page-link").html("맨앞"))
				.click(e=>{
					 $('#list_pagination').empty();
					 board.page.list({"l":1,"w":x.w});
				}).prependTo($('.pagination'));
			 
				$('<li id="end" />').addClass("page-item "+last).append($('<a/>').addClass("page-link").html("맨뒤"))
				.click(e=>{
					 $('#list_pagination').empty();
					 console.log('d.page.lastPage',d.page.lastPage);
					 board.page.list({"l":d.page.lastPage,"w":x.w});
				})
				.appendTo($('.pagination'));
		});
		
	},
	write:()=>{
		 var reg_arr = new Array(); // 0.content 1.title 2.writer 3.pass
			$('#content').html('<div id="w_page" style="margin-top:3%;" >'
					+'<p id="p_2" class="p_bold">게시글 쓰기</p>'
					+'<div id="p_2"><p style="display:inline;">제목 : </p><input type="text" class="w_title" placeholder="제목을 40자 이내로 기재해주세요. "></input></div>'
					+'<br>'
					+'<div id="p_2" class="w_c_con" >작성자 : <input type="text" id="w_writer" ></input> </div>'
					+'<br>'
					+'<div id="p_2" class="w_con"><pre id="pre_w"><textarea type="text" id="w_content" placeholder="내용은 1000자 이내로 기재해주세요."></textarea></pre></div>'
					+'<div style="color:#aaa; margin-top: 10px; padding-left: 900px;" id="w_counter">(0 / 최대 1000자)</div>'
					+'<br>'
					+'<div id="p_2" style="width:100%; text-align:left; margin-left: 11%;">password : <input type="password" id="w_pass" placeholder="문자,숫자,특수기호를 포함한 6~8자리로 입력해주세요. " style="width:23%;"></input></div>'
					+'<br>'
					+'<div id="d_btn">'
					+'<button id="w_s_btn">저장</input>'
					+'<button id="w_c_btn">취소</input>'
					+'</div>'
					+'</div>');
		
			
	    //글자수 제한
			
/*			if(ti.length>40){
				alert("제목은 최대 40자까지 입력 가능합니다.");
				$('.w_title').val(ti.substring(0, 40));
			}else if(wr.length>10){
				alert("작성자 이름은 최대 10자까지 입력 가능합니다.");
				$('#w_writer').val(wr.substring(0, 10));
			}else if(con.length>1000){
				alert("내용은 최대 1000자까지 입력 가능합니다.");
				$('#w_content').val(con.substring(0, 1000));
				$('#w_counter').html("("+con.length+" / 최대 1000자)"); 
				$('#w_counter').html('(1000 / 최대 1000자)');
			}*/
			
		$('#w_content').keyup(function (e){
		    var content = $(this).val();
		    var blank2 = /^\s+|\s+$/g;
		   
		    if(content==''||content.replace(blank2,'')==""){
				alert('공백만 사용할 수 없습니다.');
				$(this).val(content.substring(0, 0));
				/*if(blank2.test(content)==true){
			    	alert('공백만 사용할 수 없습니다!');
			    	$(this).val(content.substring(0, 0));
			    	return false;
			    }*/
			}else{
				 $('#w_counter').html("("+content.length+" / 최대 1000자)"); 
				if (content.length > 1000){
			        alert("최대 1000자까지 입력 가능합니다.");
			        $(this).val(content.substring(0, 1000));
			        $('#w_counter').html('(1000 / 최대 1000자)');
			    }
				
				
			}

		   //reg_arr[0]=content.replace(/&nbsp;/gi,'&amp;nbsp;');
		  // reg_arr[0]=content.replace(/&/gi,'&amp;');
		    reg_arr[0]=content.replace(/&/gi,'&amp;');
			
		});
		$('#w_content').focusout(function() {
			 var content = $(this).val();
			 $('#w_counter').html("("+content.length+" / 최대 1000자)"); 
			    if (content.length > 1000){
			        alert("최대 1000자까지 입력 가능합니다.");
			        $(this).val(content.substring(0, 1000));
			        $('#w_counter').html('(1000 / 최대 1000자)');
			    }
		});
	
		$('.w_title').keyup(function (e){
		    var title = $(this).val();
		    var blank = /^\s+|\s+$/g;

		    if(title==''||title.replace(blank,'')==""){
				alert('공백만 사용할 수 없습니다.');
				$(this).val(title.substring(0, 0));
			   /* if(blank.test(title)==true){
			    	alert('공백만 사용할 수 없습니다.');
			    	$(this).val(title.substring(0, 0));
			    	return false;
			    }*/
				return false;
			}else{
		    if (title.length > 50){
		        alert("최대 50자까지 입력 가능합니다.1");
		        $(this).val(title.substring(0, 50));
		    }
                                                          
		    }
		    //reg_arr[1]=title.replace(/&nbsp;/gi,'&amp;nbsp;');
		    reg_arr[1]=title.replace(/&/gi,'&amp;');
		});
		
		$('.w_title').focusout(function() {
			 var title = $(this).val();
			 var blank =  /^\s+|\s+$/g;
			    if (title.length > 50){
			        alert("최대50자까지 입력 가능합니다.2");
			        $(this).val(title.substring(0, 50));
			    }
		});
		                          
		$('#w_writer').keyup(function (e){
		    var writer = $(this).val();
		    var blank1 =  /^\s+|\s+$/g;
		    if(writer==''||writer.replace(blank1,'')==""){
				alert('공백만 사용할 수 없습니다.');
				$(this).val(writer.substring(0, 0));
				/*if(blank1.test(writer)==true){
			    	alert('공백만 사용할 수 없습니다.');
			    	$(this).val(writer.substring(0, 0));
			    	return false;
			    }*/

			}else{ 
		        if (writer.length > 10){
		            alert("최대 10자까지 입력 가능합니다.");
		            $(this).val(writer.substring(0, 10));
		        }
		    }
		    //reg_arr[2]=writer.replace(/&nbsp;/gi,'&amp;nbsp;');
		    reg_arr[2]=writer.replace(/&/gi,'&amp;');
		});
		
		$('#w_writer').focusout(function() {
			 var writer = $(this).val();
			    if (writer.length > 10){
			        alert("최대 10자까지 입력 가능합니다.");
			        $(this).val(writer.substring(0, 10));
			    }
		});                                           
	
		/*$('#w_pass').keyup(function (e){
		    var w_pass = $(this).val();
		    if(w_pass==' '){
				alert('공백만 사용할 수 없습니다.');
				$(this).val(w_pass.substring(0, 0));
			}else{ 
				$("#w_pass").change(function(){
				    checkPassword($('#w_pass').val());
				});
				function checkPassword(password){
					 w_pass = $('#w_pass').val();
					 let blank3 =/[\s]/g;
				    if(!/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,8}$/.test(password)){            
				        $('#w_pass').val(w_pass.substring(0, 0));
				        $("#w_pass").val('').focus();
				        return false;
				    }    
				    if(blank3.test(w_pass)){
				    	alert('공백은 입력할 수 없습니다.');
				    	console.log('blank3',blank3.test(w_pass));
				    	$(this).val(w_pass.substring(0, 0));}
				    var checkNumber = password.search(/[0-9]/g);
				    var checkEnglish = password.search(/[a-z]/ig);
				    if(checkNumber <0 || checkEnglish <0){
				        alert("숫자와 영문자를 혼용하여야 합니다.");
				        $("#w_pass").val('').focus();
				        return false;
				    }
				    if(/(\w)\1\1\1/.test(password)){
				        alert('같은 문자를 4번 이상 사용하실 수 없습니다.');
				        $("#w_pass").val('').focus();
				        return false;
				    }
				   
				    return true;
				}
			}
		    //reg_arr[3]=w_pass.replace(/&/gi,'&amp;');
		});*/
		
		$('#w_pass').keyup(function (e){
		    var w_pass = $(this).val();
		    if(w_pass==' '){
				alert('공백만 사용할 수 없습니다.');
				$(this).val(w_pass.substring(0, 0));
			}

		    if (w_pass.length > 8){
		        alert("문자,숫자,특수기호를 포함한 6~8자리로 입력해주세요.");
		        $(this).val(w_pass.substring(0, 8));
		    }
		    
		});
		
		
		
		$('#w_pass').change(function(){
		    checkPassword($('#w_pass').val());
		});
		function checkPassword(password){
		    var w_pass = $('#w_pass').val();
		    if(!/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,8}$/.test(password)){            
		        alert('숫자+영문자+특수문자 조합으로 6-8자리 사용해야 합니다.');
		        $('#w_pass').val('').focus();
		        return false;
		    }    
		    var checkNumber = password.search(/[0-9]/g);
		    var checkEnglish = password.search(/[a-z]/ig);
		    if(checkNumber <0 || checkEnglish <0){
		        alert("숫자와 영문자를 혼용하여야 합니다.");
		        $('#w_pass').val('').focus();
		        return false;
		    }
		    if(/(\w)\1\1\1/.test(password)){
		        alert('같은 문자를 4번 이상 사용하실 수 없습니다.');
		        $('#w_pass').val('').focus();
		        return false;
		    }
		    if (w_pass.length > 8){
	            alert("최대 8자까지 입력 가능합니다.");
	            $(this).val(w_pass.substring(0, 8));
		    }
		    if(w_pass==' '){
				alert('공백만 사용할 수 없습니다.');
				$(this).val(w_pass.substring(0, 0));
			}
		    return true;
		}
		

		$('#w_s_btn').click(e=>{
			e.preventDefault();
			let con = $('#w_content').val();
			let ti=$('.w_title').val();
			let wr=$('#w_writer').val();
			
			reg_arr[0]=$('#w_content').val();
			reg_arr[1]=$('.w_title').val();
			reg_arr[2]=$('#w_writer').val();
			reg_arr[3]=$('#w_pass').val();
			
			reg_arr[0]=con.replace(/&/gi,'&amp;');
			reg_arr[2]=wr.replace(/&/gi,'&amp;');
			reg_arr[1]=ti.replace(/&/gi,'&amp;');
			
			console.log("con.length",con.length);
			console.log("con",con);
			console.log("ti",ti);
			console.log("wr",wr);
			console.log("padd",$('#w_pass').val());
			
			console.log("reg_arr[0]",reg_arr[0]);
			console.log("reg_arr[1]",reg_arr[1]);
			console.log("reg_arr[2]",reg_arr[2]);
			/*console.log('re.len0',reg_arr[0].length);
			console.log('re.len1',reg_arr[1].length);
			console.log('re.len2',reg_arr[2].length);
			console.log('re.len2',$('#w_content').val());*/
                           
				if(reg_arr[1]==''||reg_arr[1]==null){
					//alert('빈칸을 모두 입력해 주세요');
					alert('제목을 입력해 주세요');
					$('.w_title').focus();
				}else if(reg_arr[0]==''||reg_arr[0]==null){
					alert('내용을 입력해 주세요');
					$('#w_content').focus();
				}else if(reg_arr[2]==''||reg_arr[2]==null){
					alert('작성자를 입력해 주세요');
					$('#w_writer').focus();
				}else{
					//등록인지 취소인지 판단
					let w_result = confirm('글을 게시하시겠습니까?');
					if(w_result){
						//등록 눌렀을 때
						console.log("등록 누름  : "+ w_result);
						$.ajax({
							url:$.context()+'/board/write',
							type:'POST',
							contentType:'application/json',
							data: JSON.stringify({
								title : reg_arr[1],
								content:reg_arr[0],
								writer:reg_arr[2],
								pass: $('#w_pass').val(),
								lev:0,
								parents:0
									}),
							success:d=>{
								
								if(d.wSuccess==='WRONG'){
									alert('글이 게시되지 않았습니다.');
								}else {
									alert('글이 정상 등록되었습니다.');
									
									// word 값아 넘어가라........
									board.page.list({l:'none',w:'e@5XdE6^'});
									//board.page.list({l:'none',w:d.w});
									//값을 보내면 그 페이지에 머무는게 되어버리니까 쓰지x
								}
							}
						});
						
					}else{
						//취소 눌렀을 때
						console.log("취소 누름  : "+ w_result);
					}
				}
			
		});
		
		$('#w_c_btn').click(e=>{
			e.preventDefault();
			board.page.list({l:'none',w:'e@5XdE6^'});
		});
	},
	d:x=>{
		console.log('del다음 x',x );
		$.getJSON($.context()+'/board/detail/'+x,d=>{
			console.log('del다음 x2',d );
			console.log('del_d :: ',d)
			$('#content').html('<a id="list_btn" href="#" >목록</a>'
					+'<div id="d_page " style="padding: 5%; display:block;">'
					+'          <div id="d_page_t" style="display:block;">'
					+'<br>'
					+'            <div style="width: 100%;  text-align: left;font-size: 1.3em; display:block;"><pre id="t_w"><p id="p_2" style="display: inline;" >제목 : </p>'+d.d.title+'</pre></div>'
					+'            <div style="font-size: 1.5em; display:block; width: 100%;  text-align: left; margin-right: 500px;  "><pre id="t_w"><p id="p_2" style="display:inline;">작성자 : </p>'+d.d.writer+'</pre></div>'
					//+'            <div id="d_con_box" style="display:block;"><pre>'+d.d.content+'</pre></div>'
					//+'<div id="d_con_box" style="display:block;"><pre id="pre_w" style="white-space: pre-line;">'+d.d.content+'</pre></div>'
					+'<div id="d_con_box" style="display:block;"><pre class="autosize" onkeydown="resize(this)" onkeyup="resize(this)" id="pre_w"  cols="168" wrap="hard" readonly style="width: 100%;">'+d.d.content+'</pre></div>'
					+'<br>'
					+'            <button id="d_modify_btn">수정</button>'
					+'            <button id="d_delete_btn">삭제</button>'
					+'<button id="re_save_btn" style=" margin-left: 3px;">답글등록</button></pre></div>'
					+'</div>'
					+'</div>');
			
			$(".autosize").on('keydown keyup', function () {
				  $(this).height(1).height( $(this).prop('scrollHeight')+12 );	
				});
			
			$('#d_modify_btn').click(e=>{
				e.preventDefault();
				board.page.u(d.d);
			});
			
			$('#d_delete_btn').click(e=>{
				
				e.preventDefault();
				let del_con=confirm('정말 삭제하시겠습니까?');
				if(del_con){
					board.page.del(d.d);
				}else{
					board.page.d(x);
				}
			});
			
			$('#list_btn').click(e=>{
				e.preventDefault();
				board.page.list({l:'none',w:'e@5XdE6^'});
			});
			$('#re_save_btn').click(e=>{
				console.log('re_save :: ',d.d);
				board.page.re(d.d);
			});
		});

					
	},
/*	p:x=>{
		console.log("p:x.bno",x);
		$('#content').html('<div><p>비밀번호를 입력하세요.</p>'
				+'<div id="p_2">비밀번호 : <input type="password" class="w_c_pass" id="w_c_pass" placeholder="10자 이내로 기재해주세요. "></input></div>'
				+'<button id="d_p_pass">확인</button>'
				+'</div>');
			$('#d_p_pass').click(e=>{
				e.preventDefault();
				
				if($('#w_c_pass').val()==''){
					alert('비밀번호를 입력해 주세요.');
					}else{
						console.log('여기 pass확인',$('#w_c_pass').val());
					$.ajax({//1 자바로 보낸다
						url:$.context()+'/board/pass',
						method:'POST',
						contentType:'application/json',
						data: JSON.stringify({
							pass:$('#w_c_pass').val(),
							bno:x 
						}),
						success:d=>{//4자바로부터 받았다.
							if(d.pSuc==='WRONG'){
								alert('비밀번호가 다릅니다.');
							}else{
								board.page.del(pass);
								console.log(pass);
							}
							                           
						}
					});
				}
				
			});
	},*/
	u:x=>{
		 var u_arr = new Array(); // 0.content 1.title 2.pass
		$('#content').html('<div style="margin-top: 3%;">'
				+'<div id="p_2" style="width: 100%; text-align: left;margin-left: 11%; ">제목 : <input type="text" id="u_title" style="width: 72.5%; height: 3.5%; color:#808080;" value="'+x.title+'"></input></div>'
				+'<br>'
				+'<div style="margin-left: 11%; font-size: 1.5em;   width: 100%; text-align: left;"><p id="p_2" style="display:inline;">작성자 : </p>'+x.writer+'</div>'
				+'<br>'
				+'<div id="p_2" class="w_con"><pre id="pre_w"><textarea type="text" id="u_content" >'+x.content+'</textarea></pre></div>'
				+'<div style="color:#aaa;width: 100%; text-align: right; padding-right: 14%; margin-top: 10px; " id="u_counter">(0 / 최대 1000자)</div>'
				+'<br>'
				+'<div id="p_2" style="width: 100%; text-align: left; margin-left: 11%;">비밀번호 : <input type="password" id="u_pass" style="width:25%;" placeholder="문자,숫자,특수기호를 포함한 6~8자리로 입력해주세요."></input></div>'
				+'<br>'
				+'<div>'
				+'<button id="u_com">수정완료</button>'
				+'<button id="u_can">취소</button>'
				+'</div>'
				+'</div>');
		
/*		$('#w_content').keyup(function (e){
		    var content = $(this).val();
		    $('#w_counter').html("("+content.length+" / 최대 1000자)"); 
		    if (content.length > 1000){
		        alert("최대 1000자까지 입력 가능합니다.");
		        $(this).val(content.substring(0, 1000));
		        $('#w_counter').html('(1000 / 최대 1000자)');
		    }
		    
		});*/

		$('#u_content').keyup(function (e){
		    var content = $(this).val();
		    var blank1= /^\s+|\s+$/g;
		    if(content==''||content.replace(blank1,'')==""){
				alert('공백만 사용할 수 없습니다.');
				$(this).val(content.substring(0, 0));
				/*if(blank1.test(content)==true){
			    	alert('공백만 사용할 수 없습니다.');
			    	$(this).val(content.substring(0, 0));
			    	return false;
			    }*/
			}else{
				 $('#u_counter').html("("+content.length+" / 최대 1000자)"); 
				if (content.length > 1000){
			        alert("최대 1000자까지 입력 가능합니다.");
			        $(this).val(content.substring(0, 1000));
			        $('#u_counter').html('(1000 / 최대 1000자)');
			        
			    }                                   
                
			}
		    u_arr[0]=content.replace(/&/gi,'&amp;');
		});
		
		$('#u_content').focusout(function() {
			 var content = $(this).val();
			 $('#u_counter').html("("+content.length+" / 최대 1000자)"); 
			    if (content.length > 1000){
			        alert("최대 1000자까지 입력 가능합니다.");
			        $(this).val(content.substring(0, 1000));
			        $('#u_counter').html('(1000 / 최대 1000자)');
			    }
		});

		$('#u_title').keyup(function (e){
		    var title = $(this).val();
		    var blank2= /^\s+|\s+$/g;
		    if(title==' '||title.replace(blank2,'')==""){
				alert('공백만 사용할 수 없습니다.');
				$(this).val(title.substring(0, 0));
			   /* if(blank2.test(title)==true){
			    	alert('공백만 사용할 수 없습니다.');
			    	$(this).val(title.substring(0, 0));
			    	return false;
			    }*/
			}else{
		    if (title.length > 50){
		        alert("최대 50자까지 입력 가능합니다.");
		        $(this).val(title.substring(0, 50));
		    }

			}
		    //u_arr[1]=title.replace(/&nbsp;/gi,'&amp;nbsp;');
		    u_arr[1]=title.replace(/&/gi,'&amp;');
		});
		
		$('#u_title').focusout(function() {
			 var title = $(this).val();
			    if (title.length > 50){
			        alert("최대 40자까지 입력 가능합니다.");
			        $(this).val(title.substring(0, 50));
			    }
		});
		
		$('#u_pass').keyup(function (e){
		    var pass = $(this).val();
		    if(pass==' '){
				alert('공백만 사용할 수 없습니다.');
				$(this).val(pass.substring(0, 0));
			}else{ 
				$('#u_pass').change(function(){
				    checkPassword($('#u_pass').val());
				});
				function checkPassword(password){
					 var pass = $('#u_pass').val();
					 let blank3 =/[\s]/g;
				    if(!/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,8}$/.test(password)){            
				        //alert('숫자+영문자+특수문자 조합으로 6~8자리 이상 사용해야 합니다.');
				        $('#u_pass').val(pass.substring(0, 0));
				        $("#u_pass").val('').focus();
				        return false;
				    }    
				    if(blank3.test(pass)){
				    	alert('공백은 입력할 수 없습니다.');
				    	console.log('blank3',blank3.test(pass));
				    	$(this).val(pass.substring(0, 0));}
				    var checkNumber = password.search(/[0-9]/g);
				    var checkEnglish = password.search(/[a-z]/ig);
				    if(checkNumber <0 || checkEnglish <0){
				        alert("숫자와 영문자를 혼용하여야 합니다.");
				        $('#u_pass').val('').focus();
				        return false;
				    }
				    if(/(\w)\1\1\1/.test(password)){
				        alert('같은 문자를 4번 이상 사용하실 수 없습니다.');
				        $('#u_pass').val('').focus();
				        return false;
				    }
				   
				    return true;
				}
			}
		 u_arr[2]=pass.replace(/&/gi,'&amp;');
		});
		
		
		$('#u_com').click(e=>{
			console.log('update 페이지');

			let u_con=$('#u_content').val();
			let u_ti=$('#u_title').val();
			
			u_arr[1]=$('#u_title').val();
			u_arr[0]=$('#u_content').val();
			u_arr[2]=$('#u_pass').val();
			
			u_arr[1]=u_ti.replace(/&/gi,'&amp;');
			u_arr[0]=u_con.replace(/&/gi,'&amp;');
			
			e.preventDefault();
			

			if(u_arr[1]==''||u_arr[1]==null){
				alert('제목을 입력하세요');
				$('#u_title').focus();
			}else if(u_arr[0]==''||u_arr[0]==null){
				alert('내용을 입력하세요');
				$('#u_content').focus();
			}else{
				console.log('u_arr[1]',u_arr[1]);
				console.log('u_arr[0]',u_arr[0]);
				console.log('u_arr[2]',u_arr[2]);
				console.log($('#u_pass').val());
				console.log(x.bno);
				
				
				$.ajax({
					url:$.context()+'/board/modify',
					method:'PUT',
					contentType:'application/json',
					data: JSON.stringify({
						title:u_arr[1],
						content:u_arr[0],
						pass: u_arr[2],
						bno:x.bno
						
					}),
					success:d=>{
						if(d.uSuc==='WRONG'){
							alert('비밀번호가 다릅니다.');
						}else{
							board.page.d(x.bno);
						}
					}
				});				
			}
		});
		
		$('#u_can').click(e=>{
			e.preventDefault();
			board.page.d(x.bno);
		});
		
	},
	del:x=>{
		console.log('삭제페이지들어옴');
		console.log('del_x',x);
		$('#content').html('<div id="p_2" style="margin-top: 5%;">비밀번호 : <input type="password" class="del_pass" placeholder="문자,숫자,특수기호를 포함한 6~8자리로 입력해주세요. " style="    width: 25%;"></input></div>'
				+'<br>'
				+'<button id="del_pass">확인</button>'
				+'<div>');
		
		$('.del_pass').keyup(function (e){
		    var pass = $(this).val();
		    if (pass.length > 10){
		    	 alert("문자,숫자,특수기호를 포함한 6~8자리로 입력해주세요.");
		        $(this).val(pass.substring(0, 10));
		    }
		});
		
		$('#del_pass').click(e=>{
			e.preventDefault();
			$.ajax({//1 자바로 보낸다
				url:$.context()+'/board/delete',
				method:'DELETE',
				contentType:'application/json',
				data: JSON.stringify({
					bno:x.bno,
					pass:$('.del_pass').val()
				}),
				success:d=>{//4자바로부터 받았다.
					console.log('d.delSuc :: ',d.delSuc);
					if(d.delSuc==='WRONG'){
						alert('비밀번호가 다릅니다.');
					}else {
						let del_con=confirm('게시글을 삭제하시겠습니까?');
						if(del_con){
							alert('게시글이 삭제 되었습니다.');
							
							//word 값아 넘어가라....
							board.page.list({l:'none',w:'e@5XdE6^'});
						}else{
							console.log('x.bno',x.bno)
							board.page.d(x.bno);
						}
						
						
					}
				}
			});
		});
		
	},
	re:x=>{
		var re_arr = new Array(); // 0.content 1.title 2.writer 3.pass
		console.log('re_x',x);
		$('#content').html('<div id="r_page" style="margin-top:3%;" >'
				+'<p id="p_2" class="p_bold">답글 쓰기</p>'
				+'<div id="p_2">제목 : <textarea type="text" id="r_title" style="width: 73%;  margin-right: 40px;  height: 3.5%;" >[RE : ] </textarea></div>'
				+'<br>'
				+'<div id="p_2" class="r_c_con" >작성자 : <input type="text" id="r_writer" ></input> </div>'
				+'<br>'
				+'<div id="p_2" class="r_con"><pre id="pre_r"><textarea type="text" id="r_content" placeholder="내용은 1000자 이내로 기재해주세요."></textarea></pre></div>'
				+'<div style="color:#aaa; margin-top: 10px; padding-left: 1000px;" id="r_counter">(0 / 최대 1000자)</div>'
				+'<br>'
				+'<div id="p_2" style="width:100%; text-align:left; margin-left: 11%;">password : <input type="password" id="r_pass" placeholder="문자,숫자,특수기호를 포함한 6~8자리로 입력해주세요. " style="width:23%;"></input></div>'
				+'<br>'
				+'<div id="d_btn">'
				+'<button id="r_s_btn">저장</input>'
				+'<button id="r_c_btn">취소</input>'
				+'</div>'
				+'</div>');
		
		$('#r_content').keyup(function (e){
		    var r_content = $(this).val();
		    if(r_content==' '){
				alert('공백만 사용할 수 없습니다.');
				$(this).val(r_content.substring(0, 0));
			}else{
				 $('#r_counter').html("("+r_content.length+" / 최대 1000자)"); 
				if (r_content.length > 1000){
			        alert("최대 1000자까지 입력 가능합니다.");
			        $(this).val(r_content.substring(0, 1000));
			        $('#r_counter').html('(1000 / 최대 1000자)');
			    }

			}
		    re_arr[0]=r_content.replace(/&/gi,'&amp;');
		});
			
		$('#r_title').keyup(function (e){
		    var r_title = $(this).val();
		    if(r_title==' '){
				alert('공백만 사용할 수 없습니다.');
				$(this).val(r_title.substring(0, 0));
			}else{
		    if (r_title.length > 40){
		        alert("최대 40자까지 입력 가능합니다.");
		        $(this).val(r_title.substring(0, 40));
		    }
		    }
		    re_arr[1]=r_title.replace(/&/gi,'&amp;');
		});
		
		$('#r_writer').keyup(function (e){
		    var r_writer = $(this).val();
		    if(r_writer==' '){
				alert('공백만 사용할 수 없습니다.');
				$(this).val(r_writer.substring(0, 0));
			}else{ 
		        if (r_writer.length > 10){
		            alert("최대 10자까지 입력 가능합니다.");
		            $(this).val(r_writer.substring(0, 10));
		        }
		    }
		    re_arr[2]=r_writer.replace(/&/gi,'&amp;');
		});

		$('#r_pass').keyup(function (e){
		    var r_pass = $(this).val();
		    if(r_pass==' '){
				alert('공백만 사용할 수 없습니다.');
				$(this).val(r_pass.substring(0, 0));
			}else{ 
				$("#r_pass").change(function(){
				    checkPassword($('#r_pass').val());
				});
				function checkPassword(password){
					 var r_pass = $('#r_pass').val();
				    if(!/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,8}$/.test(password)){            
				        $('#w_pass').val(r_pass.substring(0, 0));
				        $("#w_pass").val('').focus();
				        return false;
				    }    

				    var checkNumber = password.search(/[0-9]/g);
				    var checkEnglish = password.search(/[a-z]/ig);
				    if(checkNumber <0 || checkEnglish <0){
				        alert("숫자와 영문자를 혼용하여야 합니다.");
				        $("#r_pass").val('').focus();
				        return false;
				    }
				    if(/(\w)\1\1\1/.test(password)){
				        alert('같은 문자를 4번 이상 사용하실 수 없습니다.');
				        $("#r_pass").val('').focus();
				        return false;
				    }
				   
				    return true;
				}
			}
		    re_arr[3]=r_pass.replace(/&/gi,'&amp;');
		});
		

		$('#r_s_btn').click(e=>{
			e.preventDefault();
			if($('#r_title').val()==''||$('#r_writer').val()==''||$('#r_content').val()==''||$('#r_pass').val()==''||
				$.trim($('#r_title').val())==''||$.trim($('#r_writer').val())==''||
				$.trim($('#r_content').val())==''||$.trim($('#r_pass').val())==''){
				alert('빈칸을 모두 입력해 주세요');
			}else{
				console.log('re_x.bno',x.bno);
				console.log('re_x.bno',x.groupid);
				//등록인지 취소인지 판단
				let r_result = confirm('글을 게시하시겠습니까?');
				if(r_result){
					//등록 눌렀을 때
					console.log("등록 누름  : "+ r_result);
					console.log("groupid : "+ x.groupid);
					$.ajax({
						url:$.context()+'/board/rewrite',
						type:'POST',
						contentType:'application/json',
						data: JSON.stringify({
							title : re_arr[1],
							content:re_arr[0],
							writer:re_arr[2],
							pass:re_arr[3],
							parents:x.bno,
							lev:x.lev+1,
							groupid:x.groupid
						}),
						success:d=>{
							console.log('re_date :: ',d);
							if(d.reSuccess==='WRONG'){
								alert('답글이 게시되지 않았습니다.');
							}else {
								alert('답글이 정상 등록되었습니다.');
								// word 값아 넘어가라........
								board.page.list({l:'none',w:'e@5XdE6^'});
								//board.page.list({l:'none',w:d.w});
								//값을 보내면 그 페이지에 머무는게 되어버리니까 쓰지x
							}
						}
					});
				}else{
					//취소 눌렀을 때
					console.log("취소 누름  : "+ w_result);
				}
			}
		});
		
		$('#r_c_btn').click(e=>{
			alert('취소버튼');
			e.preventDefault();
			// bno 를 넘겨주어야 한다.
			board.page.d(x);
		});
	}
	
}