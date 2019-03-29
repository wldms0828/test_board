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
		$.getJSON($.context()+'/board/list/'+x.l+'/'+x.w,d=>{
			$('#content').html('<div id="list_table" style="padding: 2%; ">'
					+'<button id="write_btn" value="excel"  style="float: right; margin-bottom: 5%; "> 글쓰기 </button>'
					+'<input type="image" id="img-button" src="'+$.img()+'/Excel.png" />'
					+'		<div id="w_table">'
					+'          <table class="table table-bordered" style="margin-top: 2%;table-layout: fixed;">'
					+'            <tr id="board_tr_th">'
					+'              <th id="th_c" style="width: 58px">BNO</th>'
					+'              <th id="th_c" style="width: 1018px">TITLE</th>'
					+'              <th id="th_c" style="width: 75px">FILE</th>'
					+'              <th id="th_c" style="width: 75px">COMM</th>'
					+'              <th id="th_c" style="width: 80px">WRITER</th>'
					+'              <th id="th_c" style="width: 90px">REGDATE</th>'
					+'              <th id="th_c" style="width: 88px">VIEWCNT</th>'
					+'              <th id="th_c" style="display:none;">LEV</th>'
					+'            </tr>'					
					+'          </table>'
					+'		</div>'
					+'</div>');
			 $.each(d.list,(idx,y)=>{
				 if(y.step!=0){
					 if(y.delYN==='Y'){
						 /*if(y.lev==0){
							 y.title='원글이 삭제된 게시물 입니다.';
						 }*/
						 y.title='삭제된 답글 입니다.';
					 }
					 if(x.w=='e@5XdE6^'){
						 $('<tr>').append(
								 $('<td id="d_bno" class="d_t" style="padding-top: 16px;">').html(''),
								 $('<td id="d_title" title=" '+y.title+' " style="cursor:pointer; padding-top: 11px;" >').html('<pre class="t_r_w" id="t_t_w" style="padding-left: '+y.lev*20+'px;overflow : hidden;max-width: 1000px;min-width: 500px!important;">┗━RE :'+y.title+'</pre>').click(e=>{
									 board.page.d(y.bno);
								 }),
								 $('<td id="d_file" class="d_t" stlye="padding-top: 12px;">').html('<pre id="t_t_w">'+y.fileCnt+'</pre>'),
								 $('<td id="d_comment" class="d_t" stlye="padding-top: 12px;">').html('<pre id="t_t_w">'+y.cntRev+'</pre>'),
								 $('<td id="d_writer" title=" '+y.writer+'" class="d_t" stlye="padding-top: 12px;">').html('<pre id="t_t_w" style="overflow:hidden;">'+y.writer+'</pre>'),
								 $('<td id="d_regdate" class="d_t" style="padding-top: 16px;">').html(y.regdate),
								 $('<td id="d_viewcnt" class="d_t"  style="padding-top: 17px;">').html(y.viewCnt)
						 ).appendTo($('tbody'));
						 
					 }else{
						 $('<tr>').append(
								 $('<td id="d_bno" class="d_t" style="padding-top: 16px;">').html(y.rnum),
								 $('<td id="d_title"  title=" '+y.title+' " style="cursor:pointer; padding-top: 11px; " >').html('<pre class="t_r_w" id="t_t_w" style="overflow : hidden;width:1000px;max-width: 1000px;">'+y.title+'</pre>').click(e=>{
									 board.page.d(y.bno);
								 }),
								 $('<td id="d_file" class="d_t" stlye="padding-top: 12px;">').html('<pre id="t_t_w">'+y.fileCnt+'</pre>'),
								 $('<td id="d_comment" class="d_t" stlye="padding-top: 12px;">').html('<pre id="t_t_w">'+y.cntRev+'</pre>'),
								 $('<td id="d_writer" class="d_t" stlye="padding-top: 12px;">').html('<pre id="t_t_w" style="overflow:hidden;">'+y.writer+'</pre>'),
								 $('<td id="d_regdate" class="d_t" style="padding-top: 16px;">').html(y.regdate),
								 $('<td id="d_viewcnt" class="d_t"  style="padding-top: 17px;">').html(y.viewCnt)
						 ).appendTo($('tbody'));
					 }
					
				 }else{//step=0
					 if(y.delYN==='Y'){
						 y.title='삭제된 원글 입니다.';
						 y.fileCnt='';
						 y.cntRev='';
						 y.writer='';
						 y.regdate='';
						 y.viewCnt='';
					 }
					 if( x.w =='e@5XdE6^'){
						 $('<tr>').append(
								 $('<td id="d_bno" class="d_t" style="padding-top: 16px;">').html(y.groupid),
								 $('<td id="d_title" style="cursor:pointer; padding-top: 11px;" >').html('<pre class="t_r_w" id="t_t_w" style="padding-left: '+y.lev*40+'px;overflow : hidden;max-width: 1000px;width:1000px;">'+y.title+'</pre>').click(e=>{
									 board.page.d(y.bno);
								 }),
								 $('<td id="d_file" class="d_t" stlye="padding-top: 12px;">').html('<pre id="t_t_w">'+y.fileCnt+'</pre>'),
								 $('<td id="d_comment" class="d_t" stlye="padding-top: 12px;">').html('<pre id="t_t_w">'+y.cntRev+'</pre>'),
								 $('<td id="d_writer" class="d_t" stlye="padding-top: 12px;">').html('<pre id="t_t_w" style="overflow:hidden;">'+y.writer+'</pre>'),
								 $('<td id="d_regdate" class="d_t" style="padding-top: 16px;">').html(y.regdate),
								 $('<td id="d_viewcnt" class="d_t"  style="padding-top: 17px;">').html(y.viewCnt)
						 ).appendTo($('tbody'));
						 
					 }else{
						 $('<tr>').append(
								 $('<td id="d_bno" class="d_t" style="padding-top: 16px;">').html(y.rnum),
								 $('<td id="d_title" style="cursor:pointer; padding-top: 11px;" >').html('<pre class="t_r_w" id="t_t_w" style="padding-left: '+y.lev*40+'px;overflow : hidden;width:1000px;max-width: 1000px;">'+y.title+'</pre>').click(e=>{
									 board.page.d(y.bno);
								 }),
								 $('<td id="d_file" class="d_t" stlye="padding-top: 12px;">').html('<pre id="t_t_w">'+y.fileCnt+'</pre>'),
								 $('<td id="d_comment" class="d_t" stlye="padding-top: 12px;">').html('<pre id="t_t_w">'+y.cntRev+'</pre>'),
								 $('<td id="d_writer" class="d_t" stlye="padding-top: 12px;">').html('<pre id="t_t_w" style="overflow:hidden;">'+y.writer+'</pre>'),
								 $('<td id="d_regdate" class="d_t" style="padding-top: 16px;">').html(y.regdate),
								 $('<td id="d_viewcnt" class="d_t"  style="padding-top: 17px;">').html(y.viewCnt)
						 ).appendTo($('tbody'));
					 }

				 }
				 
				});

			$('<div id="b_search" style="padding-bottom: 4%;">').appendTo($('#content'));
			$('#b_search').html('<input type="text" id="s_word" placeholder="검색어를 입력해 주세요."></input>'
					+'<button id="s_btn">검색</button>'
					+'<button id="list_btn"  >목록</button>');
			
			var word_1 = new Array();
			$('#s_word').keyup(function (e){
			    var word = $(this).val();
			    let w_blank =/[\s]/g;
			    if(w_blank.test(word)){
			    	$(this).val(word.substring(0, 0));
			    }
			    word_1 =  word.replace(/&/gi,'&amp;');
			});
			
			$('#list_btn').click(e=>{
				e.preventDefault();
				board.page.list({l:'none',w:'e@5XdE6^'});
			});

			$('#s_btn').click(e=>{
				e.preventDefault();
				
				if($('#s_word').val()==''||$('#s_word').val()==null||$('#s_word').val()==$.trim($('#s_word').val())==''){
					alert('검색어를 입력해 주세요');
				}else{
					board.page.list({"w":word_1,"l":1});
				}
			});
		
			 $('#write_btn').click(e=>{
				 e.preventDefault();
				 board.page.write();
			 });
			 
			//엑셀다운로드
			 
			 $('#img-button').click(e=>{
					 window.location.href = $.context()+'/board/excelDown/'+x.w;
			 });
			

			 
			 
			 
			 //
			 
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
			 $('<li id="first" />').addClass("page-item "+first).append($('<a/>').addClass("page-link").html("맨앞"))
				.click(e=>{
					 $('#list_pagination').empty();
					 board.page.list({"l":1,"w":x.w});
				}).prependTo($('.pagination'));
			 
				$('<li id="end" />').addClass("page-item "+last).append($('<a/>').addClass("page-link").html("맨뒤"))
				.click(e=>{
					 $('#list_pagination').empty();
					 board.page.list({"l":d.page.lastPage,"w":x.w});
				})
				.appendTo($('.pagination'));
		});
		
	},
	write:()=>{
		 var reg_arr = new Array(); // 0.content 1.title 2.writer 3.pass
		 $('#content').html('<div style = "text-align : left; margin-top: 30px;"></div>'
					+'<div id="w_page" style="margin-top:3%;" >'
					+'<div class="sub_page">'
					+'<p id="p_2" class="p_bold">게시글 쓰기</p>'
					+'<div id="p_21" style=" margin-top: 8px; "><p style="display:inline;">제목 : </p><input type="text" class="w_title" placeholder="제목을 40자 이내로 기재해주세요. "></input></div>'
					+'<div id="p_22" class="w_c_con" style="    margin-left: 196px; margin-top: 9px;">작성자 : <input type="text" id="w_writer" ></input> </div>'
					+'<div id="p_2" class="w_con"   style="margin-left: 14px;"><pre id="pre_w"><textarea type="text" id="w_content" placeholder="내용은 1000자 이내로 기재해주세요."></textarea></pre></div>'
					+'<div style="color:#aaa; margin-top: 10px; padding-left: 1331px; width: 1447px;" id="w_counter">(0 / 최대 1000자)</div>'
					+'<div id="p_2" style="width:100%; text-align:left; margin-left: 11%; margin-top: 16px;  margin-bottom: 20px;">password : <input type="password" id="w_pass" placeholder="문자,숫자,특수기호를 포함한 6~8자리로 입력해주세요. " style="width:23%;"></input></div>'
					+'</div>'
					+'<div style="text-align: left; padding-left: 11%; padding-top: 2%;"><button href="#this" id="add" >파일 추가하기</button></div>'
					+'<div id="d_btn">'
					+'<button id="w_s_btn">저장</input>'
					+'<button id="w_c_btn">취소</input>'
					+'<button id="list_btn"  >목록</button>'
					+'</div>'
					+'</div>');
		 
		 //파일 업로드
		 var fileup;
		 var filenum=0; 
		 var filesize;
		 let sum=0;
		 var maxsize=10485760;
		 var limit = 52428800;
		 $('<form name="fileForm" action="fileUpload" method="post" enctype="multipart/form-data"/>').attr({id:'file_form'}).appendTo($('.sub_page'));
		 
		 $("#add").click(e=>{
			 e.preventDefault();
             //파일 전송 FORM
			 let div2 = $('<div style="padding-bottom: 30px;"/>').appendTo($('#file_form'));;
			 var eeeeee=$('<input style="width: auto;display: inline;position: absolute;left:402px;"/>').attr({type:"file",id:'file_'+filenum,name:'file_'+filenum, accept:".jpg,.gif,.png,.jpeg,.zip,.exe"}).addClass('inputFile');
			 let span = $('<span class="glyphicon glyphicon-remove" aria-hidden="true" style=" display: inline; right: 259px; top: 7px;" ></span>');
			 eeeeee.appendTo(div2);
 			 span.click(e=>{
				 div2.remove();
				 sum -= filesize;
				 console.log('sum2 :: ',sum);
			 }).appendTo(div2);
			 eeeeee.change(function(a) {//??
				 //span.appendTo($('#file_form'));
				 	console.log('this : ',this);
				 	console.log('files : ',this.files);
			 		let ck = (this.files[0].name.match(/jpg|gif|png|jpeg|zip|exe/i)) ? true : false;
			 		if(ck){
			 			 fileup=this.files[0].name;
			 			 filesize=this.files[0].size;
			 			 sum += filesize;
			 			 console.log('sum ----:: ',sum);
			 			 if(filesize>maxsize){
			 				 alert('10MB 이하의 첨부파일만 등록 가능 합니다. ');
			 				$(this).val('');
			 				 sum -= filesize;
			 			 }else if(sum>limit){
			 				 alert('총 50M 이하의 첨부파일만 등록 가능 합니다.');
			 				$(this).val('');
			 				 sum -= filesize;
			 			 };
						 //jieun.func.iu(this);

					 }else{  
						 alert("gif,png,jpg,jpeg,zip,exe 파일만 업로드 할 수 있습니다.");
						 $(this).val('');
					 } 
			 		console.log('sum 밖 :: ',sum);

				 });
			 filenum++;
		 });
	            
			
			$('#list_btn').click(e=>{
				e.preventDefault();
				board.page.list({l:'none',w:'e@5XdE6^'});
			});
			
			
		$('#w_content').keyup(function (e){
		    var content = $(this).val();
		    var blank2 = /^\s+|\s+$/g;
		   
		    if(content.replace(blank2,'')==""){
				$(this).val(content.substring(0, 0));
			}else{
				 $('#w_counter').html("("+content.length+" / 최대 1000자)"); 
				if (content.length > 1000){
			        alert("최대 1000자까지 입력 가능합니다.");
			        $(this).val(content.substring(0, 1000));
			        $('#w_counter').html('(1000 / 최대 1000자)');
			    }
			}

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

		    if(title.replace(blank,'')==""){
				$(this).val(title.substring(0, 0));
			   /* if(blank.test(title)==true){
			    	alert('공백만 사용할 수 없습니다.');
			    	$(this).val(title.substring(0, 0));
			    	return false;
			    }*/
				return false;
			}else{
		    if (title.length > 50){
		        alert("최대 50자까지 입력 가능합니다.");
		        $(this).val(title.substring(0, 50));
		    }
                                                          
		    }
		    reg_arr[1]=title.replace(/&/gi,'&amp;');
		});
		
		$('.w_title').focusout(function() {
			 var title = $(this).val();
			 var blank =  /^\s+|\s+$/g;
			    if (title.length > 50){
			        alert("최대50자까지 입력 가능합니다.");
			        $(this).val(title.substring(0, 50));
			    }
		});
		                          
		$('#w_writer').keyup(function (e){
		    var writer = $(this).val();
		    var blank1 =  /^\s+|\s+$/g;
		    if(writer.replace(blank1,'')==""){
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
		    reg_arr[2]=writer.replace(/&/gi,'&amp;');
		});
		
		$('#w_writer').focusout(function() {
			 var writer = $(this).val();
			    if (writer.length > 10){
			        alert("최대 10자까지 입력 가능합니다.");
			        $(this).val(writer.substring(0, 10));
			    }
		});                                           
	
		$('#w_pass').keyup(function (e){
		    var w_pass = $(this).val();
		    if(w_pass==' '){
				$(this).val(w_pass.substring(0, 0));
			}

		    if (w_pass.length > 8){
		       // alert("문자,숫자,특수기호를 포함한 6~8자리로 입력해주세요.");
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
			
				if(reg_arr[1]==''||reg_arr[1]==null){
					alert('제목을 입력해 주세요');
					$('.w_title').focus();
				}else if(reg_arr[0]==''||reg_arr[0]==null){
					alert('내용을 입력해 주세요');
					$('#w_content').focus();
				}else if(reg_arr[2]==''||reg_arr[2]==null){
					alert('작성자를 입력해 주세요');
					$('#w_writer').focus();
				}else if(reg_arr[3]==''||reg_arr[3]==null){
					alert('비밀번호를 입력해주세요');
					$('#w_pass').focus();
				}else{
					//등록인지 취소인지 판단
					let w_result = confirm('글을 게시하시겠습니까?');
					if(w_result){
						//등록 눌렀을 때
						console.log("등록 누름  : "+ w_result);
						var formdata = new FormData($('#file_form')[0]);
						console.log(formdata);
						//키값과 value값으로 formdata를 보내고
						formdata.append("title",reg_arr[1]);
						formdata.append("content",reg_arr[0]);
						formdata.append("writer",reg_arr[2]);
						formdata.append("pass",$('#w_pass').val());
						console.log($('#w_pass').val());
						formdata.append("lev",0);
						formdata.append("parents",0);
						formdata.append("step",0);
						//
						$.ajax({
							url:$.context()+'/board/write',
							type:'POST',
							contentType:false,
							processData:false,
							data:formdata,
							success:d=>{								
								if(d.wSuccess==='WRONG'){
									alert('글이 게시되지 않았습니다.');
								}else {
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
		var d_arr = new Array();
		$.getJSON($.context()+'/board/detail/'+x,d=>{
			console.log('d :: ',d);
			if(d.yn==='Y'){
				board.page.deletePage(x);
			}else{
					$('#content').html('<div id="d_page " style="padding: 5%; display:block;">'
							+'          <div id="d_page_t" style="display:block;margin-bottom: 30px;">'
							+'            <div style="width: 100%;  text-align: left;font-size: 1.3em; display:block;"><pre id="t_w"><p id="p_2" style="display: inline;" ></p><pre style="white-space: pre-wrap;    display: inline;    font-size: larger;    background-color: white;    border: 0;">'+d.d.title+'</pre></pre></div>'
							+'            <div style="font-size: 1.5em; display:block; width: 100%;  text-align: left; margin-right: 500px;  "><pre id="t_w_w" style="background-color:white; border:0;    font-size: smaller;"><p id="p_2" style="display:inline;">작성자 : </p>'+d.d.writer+'</pre></div>'
							+'			<div id="d_con_box" style="display:block;"><pre class="autosize" onkeydown="resize(this)" onkeyup="resize(this)" id="pre_w"  cols="168" wrap="hard" readonly style="width: 100%;">'+d.d.content+'</pre></div>'
							+'            <button id="d_modify_btn">수정</button>'
							+'            <button id="d_delete_btn">삭제</button>'
							+'<button id="re_save_btn" style=" margin-left: 3px;">답글등록</button>'
							+'<button id="list_btn"  >목록</button></div>'
							+'<hr>'
							+'<div style="text-align:left;"><div id="add_f" style="border-right:0.5px solid gray;width: 7%;display: inline-block;">첨부 파일</div>'
							+'<div id="file_b" style="display: grid;  padding-top: 2%;"></div>'
							+'<hr>'
							+'<div id="d_review" style="display:block; margin-top: 3%; ">'
							+'<div id="reWCon"><pre id="re_w_p"><p style="display:inline;">작성자 : </p><input id="revWriter" style="width: 13%;height:3%;    margin-right: 10px;"/>'
							+'<p style="display:inline;">비밀번호 : </p><input type="password" id="revPass" style="width: 13%;height:3%;" placeholder="문자,숫자,특수기호를 포함한 6~8자리로 입력해주세요. "/></pre>'
							+'<pre style="width: 100%;background-color:white; border: 0px;padding-left: 0px;"><div><textarea id="revContent" placeholder="댓글을 입력하세요." style="width: 94%;;height: 8%;float: left;"></textarea>'
							+'<button id="review_btn" style="    width: 75.97728000000001px; height: 83px; ">댓글 등록</button>'
							+'<span style=" margin-left: 1306px; position: absolute; display: grid;" id="rev_counter">(0 / 최대 250자)<span></div>'
							+'</pre></div>'
							+'<div id="rev_con"></div>'
							+'</div>'
							+'</div>'
							+'</div>');
				
					if(d.list2.length!=0){
						$.each(d.list2,(idx,y)=>{
							 let fsize=(y.fsize/1024)/1024;
							 let fsize2=fsize.toFixed(2);
							 $('<a id="file_'+idx+'" name="file_'+idx+'" style="width:80%;padding-left: 2%; color:black;">'+y.fname+'<h5 style="display: inline;	padding-left: 10px; color: gray;">'+fsize2+' (Mb)</h5><input type="hidden" value="'+y.fno+'" id="IDX"></a>' ).appendTo($('#file_b'));
						
							 $("#file_"+idx).click(e=>{
								 e.preventDefault();
								 window.location.href = $.context()+'/board/contract/fileDownload/'+y.fno;
								 /* var filePath = "C:\\Users\\jezza\\OneDrive\\Documents\\jieunzip_Workspace\\test\\src\\main\\webapp\\resources\\file\\upload";
								  var fileName = y.fname;
								 alert('되에에에는지?');
								 $.ajax({
									 url : $.context()+'/contract/fileDownload/'+y.fno,
									 type:'GET',
									 data: {
										 fno:y.fno						 
									 }
								 });*/
							 }); 
						 });
					}
				 				 
					let rev_con = $('#rev_con');
					let d_review = $('#d_review');
					$('#reWCon').append('<p style="width:100%; text-align:left; font-weight: bold;    padding-bottom: 40px;  font-size: x-large;     margin-bottom: 0px;    padding-top: 40px;">댓글</p>');
					let rev = {rev_con:rev_con,d_review:d_review,bno:x};
					board.page.reviewList(rev);
					
					// 댓글 0.작성자 1.내용 2.비밀번호
					$('#revWriter').keyup(function (e){
					    var revWri = $(this).val();
					    var b = /^\s+|\s+$/g;
					    if(revWri==''||revWri.replace(b,'')==""){
							$(this).val(revWri.substring(0, 0));
						
						}
						
					});
					$('#revWriter').focusout(function() {
						 var revWri = $(this).val();
						    if (revWri.length > 10){
						        alert("최대 10자까지 입력 가능합니다.");
						        $(this).val(revWri.substring(0, 10));
						    }
					});
					// 댓 내용
					$('#revContent').keyup(function (e){
					    var revCon = $(this).val();
					    var b2 = /^\s+|\s+$/g;
					   
					    if(revCon==''||revCon.replace(b2,'')==""){
							$(this).val(revCon.substring(0, 0));
						}else{
							 $('#rev_counter').html("("+revCon.length+" / 최대 250자)"); 
							if (revCon.length > 250){
						        alert("최대 250자까지 입력 가능합니다.");
						        $(this).val(revCon.substring(0, 250));
						        $('#rev_counter').html('(250 / 최대 250자)');
						    }
						}
					    d_arr[1]=revCon.replace(/&/gi,'&amp;');
					});
					$('#revContent').focusout(function() {
						 var revCon = $(this).val();
						 $('#rev_counter').html("("+revCon.length+" / 최대 250자)"); 
						    if (revCon.length > 250){
						        alert("최대 250자까지 입력 가능합니다.");
						        $(this).val(revCon.substring(0, 250));
						        $('#rev_counter').html('(250 / 최대 250자)');
						    }
					});
					
					//댓 비번
					$('#revPass').keyup(function (e){
					    var rev_pass = $(this).val();
					    if(rev_pass==' '){
							$(this).val(rev_pass.substring(0, 0));
						}

					    if (rev_pass.length > 8){
					      //  alert("문자,숫자,특수기호를 포함한 6~8자리로 입력해주세요.");
					        $(this).val(rev_pass.substring(0, 8));
					    }
					    
					});
					
					
					$('#revPass').change(function(){
					    checkPassword($('#revPass').val());
					});
					function checkPassword(password){
					    var rev_pass = $('#revPass').val();
					    if(!/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,8}$/.test(password)){            
					        alert('숫자+영문자+특수문자 조합으로 6-8자리 사용해야 합니다.');
					        $('#revPass').val('').focus();
					        return false;
					    }    
					    var checkNumber = password.search(/[0-9]/g);
					    var checkEnglish = password.search(/[a-z]/ig);
					    if(checkNumber <0 || checkEnglish <0){
					        alert("숫자와 영문자를 혼용하여야 합니다.");
					        $('#revPass').val('').focus();
					        return false;
					    }
					    if(/(\w)\1\1\1/.test(password)){
					        alert('같은 문자를 4번 이상 사용하실 수 없습니다.');
					        $('#revPass').val('').focus();
					        return false;
					    }
					    if (rev_pass.length > 8){
				            alert("최대 8자까지 입력 가능합니다.");
				            $(this).val(rev_pass.substring(0, 8));
					    }
					    if(rev_pass==' '){
							$(this).val(rev_pass.substring(0, 0));
						}
					    return true;
					}
					
					//
				
				$('#review_btn').click(e=>{
					e.preventDefault();
					let recon = $('#revContent').val();
					let rewr=$('#revWriter').val();
					
					d_arr[1]=$('#revContent').val();
					d_arr[0]=$('#revWriter').val();
					
					d_arr[0]=rewr.replace(/&/gi,'&amp;');
					d_arr[1]=recon.replace(/&/gi,'&amp;');
					
					if(d_arr[1]==''||d_arr[1]==null){
						alert('댓글 입력해 주세요');
						$('#revContent').focus();
					}else if(d_arr[0]==''||d_arr[0]==null){
						alert('작성자를 입력해 주세요');
						$('#revWriter').focus();
					}else if($('#revPass').val()==''||$('#revPass').val()==null){
						alert('비밀번호를 입력해 주세요');
						$('#revPass').focus();
					}else{
						//let reviewPage = {rePage:$('#rev_con'),revWriter:$('#revWriter').val(),revPass:$('#revPass').val(),revContent:$('#revContent').val(),bno:x,r_t:$('#d_review'),d_p:$('#d_page')};
						let reviewPage = {rePage:$('#rev_con'),revWriter:d_arr[0],revPass:$('#revPass').val(),revContent:d_arr[1],bno:x,r_t:$('#d_review'),d_p:$('#d_page')};
						board.page.review(reviewPage);
					}
				});
				
				$(".autosize").on('keydown keyup', function () {
					  $(this).height(1).height( $(this).prop('scrollHeight')+12 );	
					});
				
				$('#d_modify_btn').click(e=>{
					e.preventDefault();
					let fileInfo={d:d.d,f:d.list2};
					board.page.u(fileInfo);
				});
				
				$('#d_delete_btn').click(e=>{
					e.preventDefault();
					/*let del_con=confirm('정말 삭제하시겠습니까?');
					if(del_con){*/
						board.page.del(d.d);
					/*}else{
						board.page.d(d);
					}*/
				});
				
				$('#list_btn').click(e=>{
					//history.back();
					e.preventDefault();
					board.page.list({l:'none',w:'e@5XdE6^'});
				});
				$('#re_save_btn').click(e=>{
					board.page.re(d.d);
					console.log('#re_save_btn :: ',d.d);
				});
			}

			
			
			
		});
	},

	u:x=>{
		console.log('u :: ',x);
		 var u_arr = new Array(); // 0.content 1.title 2.pass
		$('#content').html(`<div style="margin-top: 3%;">
				<div style="" id="file_page">
				<div id="p_2" style="width: 100%; text-align: left;margin-left: 11%; ">제목 : <input type="text" id="u_title" style="width: 72.5%; height: 3.5%; color:#808080;" value="`+x.d.title+`"></input></div>
				<br>
				<div style="margin-left: 11%; font-size: 1.5em;   width: 100%; text-align: left;"><p id="p_2" style="display:inline;">작성자 : </p>`+x.d.writer+`</div>
				<br>
				<div id="p_2" class="w_con"><pre id="pre_w"><textarea type="text" id="u_content" >`+x.d.content+`</textarea></pre></div>
				<div style="color:#aaa;width: 100%; text-align: right; padding-right: 14%; margin-top: 10px; " id="u_counter">(0 / 최대 1000자)</div>
				<br>
				<div id="p_2" style="width: 100%; text-align: left; margin-left: 11%; ">비밀번호 : <input type="password" id="u_pass" style="width:25%;" placeholder="문자,숫자,특수기호를 포함한 6~8자리로 입력해주세요."></input></div>
				</div>
				<br>
				<div id="filep" style="padding-top:2%;text-align: left; padding-left: 11%;"></div>
				<div style="text-align: left; padding-left: 11%; padding-top: 2%;"><button href="#this" id="add1" >파일 추가하기</button></div>
				<div>
				<button id="u_com">수정완료</button>
				<button id="u_can">취소</button>
				</div>
				</div>`);
		
		 var fileup1;
		 var filenum1=0; 
		 var filesize1;
		 
		 var sum1=0;
		 var maxsize1=10485760;
		 var tot=52428800;
		 if(x.f.length!=0){
			 var xfsum = x.f[0].FSUM;
			 sum1+=xfsum;
			 console.log('xfsum :: ',xfsum);
			 console.log('sum1 위위위우이ㅜ이ㅜ이ㅜ이 :: ',sum1);
		 }
		 $('<form name="fileForm1" action="fileUpload" method="post" enctype="multipart/form-data"/>').attr({id:'file_form1'}).appendTo($('#filep'));
		 $("#add1").click(e=>{
			 e.preventDefault();
            //파일 전송 FORM
			 
			 let div3 = $('<div style="padding-bottom: 1%;"></div>').appendTo($('#file_form1'));
			 var eeeeee1=$('<input style="width: auto;display: inline;right: 1280px; "/>').attr({type:"file",id:'file_'+filenum1,name:'file_'+filenum1, accept:".jpg,.gif,.png,.jpeg,.zip,.exe"}).addClass('inputFile1');
			 let span1 = $('<span class="glyphicon glyphicon-remove" aria-hidden="true" style="top: 2px; left: 2px;" ></span>');
			 eeeeee1.appendTo(div3);
			 eeeeee1.change(function(a) {//??
			 		let ck = (this.files[0].name.match(/jpg|gif|png|jpeg|zip|exe/i)) ? true : false;
			 		if(ck){
			 			 fileup1=this.files[0].name;
			 		     filesize1=this.files[0].size;
			 		     
			 			 sum1 += filesize1;
			 			// sum1 += xfsum;
			 			 if(filesize1>maxsize1){
			 				 alert('10MB 이하의 파일만 업로드 할 수 있습니다.');
			 				 $(this).val('');
			 				sum1 -= filesize1;
			 			 }else if(sum1>tot){
			 				 alert('총 50MB 파일까지 업로드 할 수 있습니다1.');
			 				 $(this).val('');
			 				 sum1 -= filesize1;
			 				console.log('sum1 :: ',sum1);
			 			 }
			 			console.log('sum1ddddddddd :: ',sum1);
			 			console.log('filesize1 :: ',filesize1);
			 			
						 span1.click(e=>{
							 div3.remove();
							 sum1 -= filesize1;
							 tot -= sum1;
						 }).appendTo(div3);
					 }else{  
						 alert("gif,png,jpg,jpeg,zip,exe 파일만 업로드 할 수 있습니다.");
						 $(this).val('');
					 } 
				 });
			 filenum1++;
		 });
		 
			$.each(x.f,(idx,y)=>{
				let fsum=x.f[0].FSUM;//디비에서 뽑아온 파일의 총사이즈 바이트
				let fsum1=fsum.toFixed(2);//이건 보여줄 때 사용 
				let fsize3=parseInt(x.f[idx].fsize); //디비에 저장돼어 있는 파일의 사이즈
				let fsize4=((fsize3/1024)/1024).toFixed(2);//보여줄때 1024로 나눠줘야 함.toFixed(2)
				let div=$('<div id="file_f'+idx+'"><input id="f_v'+idx+'" style="display:none;" value="'+x.f[idx].fno+'"></input></div>');
				let f = $('<span class="glyphicon glyphicon-file" aria-hidden="true" style="padding-right:2%;display: -webkit-box; padding-bottom: 1%; font-size: large;"></span>');
				let c = $('<span id="file_c'+idx+'" class="glyphicon glyphicon-remove" aria-hidden="true" style="display: -webkit-box;     padding-left: 3; padding-top: 3;"></span>');
				
				f.appendTo(div);
				div.appendTo($('#filep'));
				f.append($('<div id ="c_c" style="display: inline-block;">'+x.f[idx].fname+'<input id="fsize'+idx+'" style="color:gray; display:none;" value="'+fsize4+'" readonly>('+fsize4+'Mb)</input></div>'));
				c.appendTo(f);
				let sizeval=$('#fsize'+idx).val();
				
				$('file_'+idx).text(x.f[idx].fname);
				$('#file_c'+idx).click(e=>{
					$('#file_f'+idx).remove();
					console.log('fsize3 :: ',fsize3);
					xfsum = xfsum - fsize3;//fsum-=fsize3;
					console.log('fsum -= fsize3  2222222:: ',xfsum );
					//fsum=sum1;
					console.log('sum1 아아아래 :: ',sum1 );
					$.ajax({
						url:$.context()+'/board/modify2',
						method:'DELETE',
						contentType:'application/json',
						data: JSON.stringify({
							fno:x.f[idx].fno
						}),
						success:d=>{
							if(d.suc==='WRONG'){
								alert('파일 삭제 오류입니다.');
							}else{
							 //sum1 -= filesize1;
							}
						}
					});
				});
				
			});
			
			if(xfsum>tot){
				alert('파일은 총 50MB까지 업로드 가능합니다. ');
				eeeeee1.empty();
			}
			
/*			if((sum1+=fsum)>tot){
				alert('총 50MB 파일까지 업로드 할 수 있습니다2.');
				//eeeeee1.val('');
				//console.log('디이이이이이스 :: ',eeeeee1.val(''));
			}*/
			
/*			
			if((fsum1+sum1)<limit){
				alert('50넘음!');
				 $(this).val('');
			}*/
		
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
			        alert("최대 50자까지 입력 가능합니다.");
			        $(this).val(title.substring(0, 50));
			    }
		});
		
		$('#u_pass').keyup(function (e){
		    var pass = $(this).val();
		    if(pass==' '){
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
			e.preventDefault();
			let u_con=$('#u_content').val();
			let u_ti=$('#u_title').val();
			
			u_arr[1]=$('#u_title').val();
			u_arr[0]=$('#u_content').val();
			u_arr[2]=$('#u_pass').val();
			
			u_arr[1]=u_ti.replace(/&/gi,'&amp;');
			u_arr[0]=u_con.replace(/&/gi,'&amp;');
			
			if(u_arr[1]==''||u_arr[1]==null){
				alert('제목을 입력하세요');
				$('#u_title').focus();
			}else if(u_arr[0]==''||u_arr[0]==null){
				alert('내용을 입력하세요');
				$('#u_content').focus();
			}else if($('#u_pass').val()==''){
				alert('비밀번호를 입력해 주세요.');
			}else{
				var formdata1 = new FormData($('#file_form1')[0]);
				formdata1.append("title",u_arr[1]);
				formdata1.append("content",u_arr[0]);
				formdata1.append("pass",u_arr[2]);
				formdata1.append("bno",x.d.bno);
				$.ajax({
					url:$.context()+'/board/modify',
					method:'POST',
					contentType:false,
					//contentType : "application/json; charset=UTF-8",
					processData:false,
					data: formdata1,
					success:d=>{
						if(d.uSuc==='WRONG'){
							alert('비밀번호가 다릅니다.');
						}else{
							board.page.d(x.d.bno);
						}
					}
				});				
			}
		});
		
		$('#u_can').click(e=>{
			e.preventDefault();
			board.page.d(x.d.bno);
		});
		
	},
	del:x=>{
		console.log('x[0].bno :: ',x.bno);
		console.log('x :: ',x);
		
		
		$('#content').html('<div id="p_2" style="margin-top: 5%;">비밀번호 : <input type="password" class="del_pass1" placeholder="문자,숫자,특수기호를 포함한 6~8자리로 입력해주세요. " style="    width: 25%;"></input></div>'
				+'<br>'
				+'<button id="del_pass">확인</button>'
				+'<button id="back_pass">취소</button>'
				+'<div>');
		
		$('.del_pass1').keyup(function (e){
		    var pass = $(this).val();
		    if (pass.length > 8){
		    //	 alert("문자,숫자,특수기호를 포함한 6~8자리로 입력해주세요.");
		        $(this).val(pass.substring(0, 8));
		    }
		});
		
		$('#back_pass').click(e=>{
			e.preventDefault();
			board.page.d(x.bno);
		});
		
		
		$('#del_pass').click(e=>{
			e.preventDefault();
			console.log("$('.del_pass1').val()",$('.del_pass1').val());
			console.log("x[0].pass",x.pass);
			if($('.del_pass1').val()!=x.pass){
				let pass1 =$('.del_pass1').val();
				alert('비밀번호가 다릅니다.');
				$('.del_pass1').val(pass1.substring(0, 0));
			}else if($('.del_pass1').val()==x.pass){
				let del_con=confirm('게시글을 삭제하시겠습니까?');
				if(del_con){
					$.ajax({//1 자바로 보낸다
						url:$.context()+'/board/delete',
						method:'DELETE',
						contentType:'application/json',
						data: JSON.stringify({
							bno:x.bno,
							pass:$('.del_pass1').val()
						}),
						success:d=>{//4자바로부터 받았다.
							if(d.delSuc==='WRONG'){
								board.page.del(x);
							}else {
								board.page.list({l:'none',w:'e@5XdE6^'});
							}
						}
					});
				}else{
					board.page.d(x.bno);
				}
			}

			
		});
		
	},
	deletePage:()=>{
		$('#content').html(
				'<div style=" padding: 107.516 0;">삭제된 게시물 입니다.</div>'
				+'<button id="list_btn">목록</button>');
		
		$('#list_btn').click(e=>{
			e.preventDefault();
			board.page.list({l:'none',w:'e@5XdE6^'});
		});
	},
	re:x=>{
		var re_arr = new Array(); // 0.content 1.title 2.writer 3.pass
		$('#content').html('<div style = "text-align : left; margin-top: 30px;"></div>'
				+'<div id="r_page" style="margin-top:3%;" >'
				+'<p id="p_2" class="p_bold">답글 쓰기</p>'
				+'<div id="p_2">제목 : <input type="text" id="r_title" style="width: 73%;  margin-right: 40px;  height: 3.5%;" ></input></div>'
				+'<br>'
				+'<div id="p_2" class="r_c_con" >작성자 : <input type="text" id="r_writer" ></input> </div>'
				+'<br>'
				+'<div id="p_2" class="r_con"><pre id="pre_r"><textarea type="text" id="r_content" placeholder="내용은 1000자 이내로 기재해주세요."></textarea></pre></div>'
				+'<div style="color:#aaa; margin-top: 10px; padding-left: 1000px;" id="r_counter">(0 / 최대 1000자)</div>'
				+'<br>'
				+'<div id="p_2" style="width:100%; text-align:left; margin-left: 11%;">password : <input type="password" id="ree_pass" placeholder="문자,숫자,특수기호를 포함한 6~8자리로 입력해주세요. " style="width:23%;"></input></div>'
				+'<br>'
				+'<div id="d_btn">'
				+'<button id="r_s_btn">저장</input>'
				+'<button id="r_c_btn">취소</input>'
				+'<button id="list_btn"  >목록</button>'
				+'</div>'
				+'</div>');
		
		$('#list_btn').click(e=>{
			e.preventDefault();
			board.page.list({l:'none',w:'e@5XdE6^'});
		});
		
		$('#r_content').keyup(function (e){
		    var r_content = $(this).val();
		    
		    var blank2 = /^\s+|\s+$/g;
			   
		    if(r_content.replace(blank2,'')==""){
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
		
		$('#r_content').focusout(function() {
			 var r_content = $(this).val();
			 $('#r_counter').html("("+r_content.length+" / 최대 1000자)"); 
			    if (r_content.length > 1000){
			        alert("최대 1000자까지 입력 가능합니다.");
			        $(this).val(r_content.substring(0, 1000));
			        $('#r_counter').html('(1000 / 최대 1000자)');
			    }
		});
			
		$('#r_title').keyup(function (e){
		    var r_title = $(this).val();
		    var blank2 = /^\s+|\s+$/g;
		    
		    if(r_title.replace(blank2,'')==""){
				$(this).val(r_title.substring(0, 0));
			}else{
		    if (r_title.length > 50){
		        alert("최대 50자까지 입력 가능합니다.");
		        $(this).val(r_title.substring(0, 50));
		    }
		    }
		    re_arr[1]=r_title.replace(/&/gi,'&amp;');
		});
		
		$('#r_title').focusout(function() {
			 var r_title = $(this).val();
			    if (r_title.length > 50){
			        alert("최대 50자까지 입력 가능합니다.");
			        $(this).val(r_title.substring(0, 50));
			    }
		});
		
		$('#r_writer').keyup(function (e){
		    var r_writer = $(this).val();
		    var blank2 = /^\s+|\s+$/g;
		    if(r_writer.replace(blank2,'')==""){
				$(this).val(r_writer.substring(0, 0));
			}else{ 
		        if (r_writer.length > 10){
		            alert("최대 10자까지 입력 가능합니다.");
		            $(this).val(r_writer.substring(0, 10));
		        }
		    }
		    re_arr[2]=r_writer.replace(/&/gi,'&amp;');
		});
		
		$('#r_writer').focusout(function() {
			 var r_writer = $(this).val();
			    if (r_writer.length > 10){
			        alert("최대 10자까지 입력 가능합니다.");
			        $(this).val(r_writer.substring(0, 10));
			    }
		});

		$('#ree_pass').keyup(function (e){
            var r_pass1= $(this).val();
            if(r_pass1==' '){
                  $(this).val(r_pass1.substring(0, 0));
             }
            if (r_pass1.length > 8){
             //   alert("문자,숫자,특수기호를 포함한 6~8자리로 입력해주세요.");
                $(this).val(r_pass1.substring(0, 8));
            }
           
        });
        
        
       $('#ree_pass').change(function(){
            checkPassword($('#ree_pass').val());
        });
        function checkPassword(password){
            var r_pass1= $('#ree_pass').val();
            if(!/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,8}$/.test(password)){           
                alert('숫자+영문자+특수문자 조합으로 6-8자리 사용해야 합니다.');
                $('#ree_pass').val('').focus();
                return false;
            }   
            var checkNumber = password.search(/[0-9]/g);
            var checkEnglish = password.search(/[a-z]/ig);
            if(checkNumber <0 || checkEnglish <0){
                alert("숫자와 영문자를 혼용하여야 합니다.");
               $('#ree_pass').val('').focus();
                return false;
            }
            if(/(\w)\1\1\1/.test(password)){
                alert('같은 문자를 4번 이상 사용하실 수 없습니다.');
                $('#ree_pass').val('').focus();
                return false;
            }
            if (r_pass1.length > 8){
              alert("최대 8자까지 입력 가능합니다.");
              $(this).val(r_pass1.substring(0, 8));
            }
            if(r_pass1==' '){
                  $(this).val(r_pass1.substring(0, 0));
             }
            return true;
        };

		$('#r_s_btn').click(e=>{
			e.preventDefault();
	
			let rcon = $('#r_content').val();
			let rti=$('#r_title').val();
			let rwr=$('#r_writer').val();
			let r_pass1=$('#ree_pass').val();
			re_arr[0]=$('#r_content').val();
			re_arr[0]=rcon.replace(/&/gi,'&amp;');
			re_arr[1]=$('#r_title').val();
			re_arr[1]=rti.replace(/&/gi,'&amp;');
			re_arr[2]=$('#r_writer').val();
			re_arr[2]=rwr.replace(/&/gi,'&amp;');
			re_arr[3]=r_pass1.replace(/&/gi,'&amp;');
			re_arr[3]=$('#ree_pass').val();
		
			if(re_arr[0]==''||re_arr[0]==null){
				alert('답글 내용을 입력해 주세요');
				$('#r_content').focus();
				}else if(re_arr[1]==''||re_arr[1]==null){
				alert('답글 제목을 입력해 주세요');
				$('#r_title').focus();
					}else if(re_arr[2]==''||re_arr[2]==null){
					alert('답글 작성자를 입력해 주세요');
					$('#r_writer').focus();
						}else{
				console.log('re_x.bno',x.bno);
				console.log('re_x.bno',x.groupid);
				//등록인지 취소인지 판단
				let r_result = confirm('글을 게시하시겠습니까?');
				if(r_result){
					//등록 눌렀을 때
					console.log("등록 누름  : "+ r_result);
					console.log("groupid : "+ x.groupid);
					console.log("x.step : "+ x.step);
					$.ajax({
						url:$.context()+'/board/rewrite',
						type:'POST',
						contentType:'application/json',
						data: JSON.stringify({
							title :re_arr[1],
							content:re_arr[0],
							writer:re_arr[2],
							pass:$('#ree_pass').val(),
							parents:x.bno,
							lev:x.lev+1,
							groupid:x.groupid,
							step:x.step+1
							
						}),
						success:d=>{
							if(d.reSuccess==='WRONG'){
								board.page.list({l:'none',w:'e@5XdE6^'});
							}else {
								// word 값아 넘어가라........
								board.page.list({l:'none',w:'e@5XdE6^'});
								//board.page.list({l:'none',w:d.w});
								//값을 보내면 그 페이지에 머무는게 되어버리니까 쓰지x
							}
						}
					});
				}else{
					//취소 눌렀을 때
				}
			}
		});
		
		$('#r_c_btn').click(e=>{
			e.preventDefault();
			// bno 를 넘겨주어야 한다.
			board.page.d(x);
		});
	},
	review:x=>{
		console.log('review d :: ',x);
		$.ajax({
			url:$.context()+'/board/revWrite',
			method:'POST',
			contentType:'application/json',
			data:JSON.stringify({
				writer : x.revWriter,
				content: x.revContent,
				bno: x.bno,
				pass : x.revPass,
			}),
			success:d=>{		
				if(d.revWS == "CORRECT"){
					board.page.d(x.bno);
					board.page.reviewList(x);
				}else{
					alert('댓글 등록에 실패했습니다.');
				}
			}
		})	
	},
	reviewList:x=>{
		if(x.i==undefined){x.i=1;}
		$.getJSON($.context()+'/board/revList/'+x.bno+'/'+x.i,d=>{
		 $.each(d.revList,(idx,y)=>{
			 let d_revL=$('<div id="revL_'+idx+'">');
			 d_revL.appendTo(x.rev_con);
			 if(y.delYN === 'N'){
				 
				 let ds_revL=$('<div id="s_revL" style="height: auto;">');
				 let pre_r=$('<pre style="background-color:white; border:0; width:100%; text-align:left; padding-bottom: 0px;">');
				 let reg_w= $('<div style="margin-bottom:10">작성자 : <p style="display: inline;">'+y.writer+'  /</p>');
				 let reg_p = $('<p style="display: inline; margin-left: 10;">'+y.regdate+'</p>');
				 let rev_btn = $('<div style="display: inline; float: right;">');
				 let rev_up_b = $('<button id="rev_up_'+idx+'">수정</button>');
				 let rev_del_b = $('<button id="rev_del_'+idx+'" >삭제<div id="rseqid2_'+idx+'" style="display:none;">'+y.reviewSeq+'</div></button>');
				 let rev_cont = $('<pre style="background-color:white; border:0;width: 1219px; white-space: pre-wrap; padding-left: 0px;" >'+y.content+'</pre>');
				 let hr=$('<hr style="margin:10 0 10 0; ">');

				 ds_revL.appendTo(d_revL);	
				 pre_r.appendTo(ds_revL);
	 			 reg_w.appendTo(pre_r);	
				 reg_p .appendTo(reg_w);
				 rev_btn.appendTo(reg_w);
				 
				 rev_up_b.appendTo(rev_btn).click(e=>{
					 let reUp={revL:$('#revL_'+idx),rseq:$('#rseqid2_'+idx).text(),bno:y.bno};
					 $('#revL_'+idx).empty();
					 board.page.reviewD1(reUp);
				 });
				 rev_del_b.appendTo(rev_btn).click(e=>{
					 let r_del={rev_con:x.rev_con,rseq:$('#rseqid2_'+idx).text(),bno:y.bno};
					 board.page.reviewD(r_del);
					 console.log('r_del :: ',r_del);
				 });
				 rev_cont.appendTo(pre_r);
				 hr.appendTo(d_revL);
				 
			 }
			 else if(y.delYN === 'Y'){
				 console.log('y.delYN2 :: ',y.delYN);
				 //console.log( $('#revL_'+idx+''));
				 $('#revL_'+idx).html('<div id="del_dat" style="text-align: left;" >삭제된 댓글입니다.</div>');
				 //$('#del_dat').append('<hr style="margin:10 0 10 0; ">');
				 $('#revL_'+idx).append('<hr style="margin:10 0 10 0; ">');
			 }
			});

		 
		 $('<div id="list_pagination1" style="text-align:center;">').html('<nav>'
				 +'  <ul class="pagination">'
				 +'  </ul>'
				 +'</nav>').appendTo(x.rev_con);
		 
		 for (let i = d.page.beginPage;i<=d.page.endPage;i++){
			 let ac =(i==d.page.pageNum)? "active":"";
			 $('<li/>').addClass('page-item '+ac).append($('<a/>').addClass('page-link').html(i)).appendTo($('.pagination')).click(e=>{
				 e.preventDefault();
				 $('#list_pagination1').remove();
				 x.rev_con.empty();
				 board.page.reviewList({"i":i,bno:x.bno,rev_con:x.rev_con});
				 
				});
		 }
		 
		 let disp = (d.page.existPrev)? "": "hidden" ;
		 let disn = (d.page.existNext)? "": "hidden" ;
		 
		 $('<li id="pre" />').addClass("page-item "+disp).append($('<a/>').addClass("page-link").html("<"))
			.click(e=>{
				 $('#list_pagination1').empty();
				 board.page.reviewList({"i":i,bno:x.bno,rev_con:x.rev_con});
			}).prependTo($('.pagination'));
		$('<li id="next" />').addClass("page-item "+disn).append($('<a/>').addClass("page-link").html(">"))
			.click(e=>{
				 $('#list_pagination1').empty();
				 board.page.reviewList({"i":i,bno:x.bno,rev_con:x.rev_con});
			})
			.appendTo($('.pagination'));
		
		let first = (d.page.firstPage)? "" : "hidden";
		let last = (d.page.lastPage)? "" : "hidden";
		 $('<li id="first" />').addClass("page-item "+first).append($('<a/>').addClass("page-link").html("맨앞"))
			.click(e=>{
				 $('#list_pagination1').empty();
				 x.rev_con.empty();
				 board.page.reviewList({"i":1,bno:x.bno,rev_con:x.rev_con});
			}).prependTo($('.pagination'));
		 
			$('<li id="end" />').addClass("page-item "+last).append($('<a/>').addClass("page-link").html("맨뒤"))
			.click(e=>{
				 $('#list_pagination1').empty();
				 x.rev_con.empty();
				 board.page.reviewList({"i":d.page.lastPage,bno:x.bno,rev_con:x.rev_con});
			})
			.appendTo($('.pagination'));
		 
		});
	},
	reviewD:x=>{
		$.getJSON($.context()+'/board/redetail/'+x.rseq,d=>{
			console.log(' reviewD///x:: ',x);
			console.log('reviewD :: ',d.d);
			let d_Del  = {revL:x.rev_con,del_d:d.d};
			board.page.reviewDel(d_Del);
		});
	},
	reviewD1:x=>{
		console.log('reviewD1 x :: ',x);
		console.log('x.rseq :: ',x.rseq);
		$.getJSON($.context()+'/board/redetail/'+x.rseq,d=>{
			console.log('reviewD1 :: ',d.d);
			let d_d={d:d.d,con:x.revL};
			board.page.reviewUp(d_d);
		});
	},
	reviewDel:x=>{
		console.log('reviewDel 1 :: ',x);
		console.log('reviewDel del_d :: ',x.del_d.pass);
		$('#content').html('<div id="p_2" style="margin-top: 5%;">비밀번호 : <input type="password" id="revd_pass" placeholder="문자,숫자,특수기호를 포함한 6~8자리로 입력해주세요. " style="    width: 25%;"></input></div>'
				+'<br>'
				+'<button id="revd_b">확인</button>'
				+'<button id="revd_back">취소</button>'
				+'<div>');
		
		$('#revd_pass').keyup(function (e){
		    var rpass = $(this).val();
		    if (rpass.length > 8){
		    	 //alert("문자,숫자,특수기호를 포함한 6~8자리로 입력해주세요.");
		        $(this).val(rpass.substring(0, 8));
		    }
		});
		
		$('#revd_back').click(e=>{
			e.preventDefault();
			board.page.d(x.del_d.bno);
		});
		
		$('#revd_b').click(e=>{
			e.preventDefault();
			
			if($('#revd_pass').val()!=x.del_d.pass){
				let pass2 =$('#revd_pass').val();
				alert('비밀번호가 다릅니다.');
				$('#revd_pass').val(pass2.substring(0, 0));
			}else if($('#revd_pass').val()==x.del_d.pass){
				let del_con=confirm('게시글을 삭제하시겠습니까?');
				if(del_con){
					x.revL.empty();
					board.page.reviewList({"i":1,bno:x.del_d.bno,rev_con:x.rev_con});
					$.ajax({//1 자바로 보낸다
						url:$.context()+'/board/redelete',
						method:'DELETE',
						contentType:'application/json',
						data: JSON.stringify({
							bno:x.del_d.bno,
							reviewSeq:x.del_d.reviewSeq,
							pass:$('#revd_pass').val()
						}),
						success:d=>{//4자바로부터 받았다.
							if(d.rdel==='WRONG'){
								board.page.reviewDel(x);
							}else {
								board.page.d(x.del_d.bno);
							}
						}
					});
				}else{
					board.page.d(x.del_d.bno);
				}
				
			}
		});
	},
	reviewUp:x=>{
		var ru_arr = new Array();
		console.log('reviewUp 1 :: ',x);
		$('<div id="reWCon1"><pre id="re_w_p"><p style="display:inline;">작성자 : </p>'+x.d.writer+''
		+'<p style="display:inline;">  /  비밀번호 확인 : </p><input type="password" id="revMoPass" style="width: 13%;height:3%;"/>'
		+'<pre style="width: 100%;background-color:white; border: 0px;padding-left: 0px;"><div><textarea id="revMoContent" placeholder="" style="width: 93.5%;;height: 8%;float: left;">'+x.d.content+'</textarea>'
		+'<button id="review_mo_btn" style="    width: 75.97728000000001px; height: 37px; ">수정 완료</button>'
		+'<button id="rev_can_mo_btn" style="    width: 75.97728000000001px; height: 37px; ">수정 취소</button>'
		+'<span style="padding-top: 10px;margin-left: 1150px;position: absolute; display: grid;" id="revcounter">(0 / 최대 250자)</span></div>'
		+'</pre></div>').appendTo(x.con);
		
		//댓내용
		$('#revMoContent').keyup(function (e){
		    var revMoCon = $(this).val();
		    var b2 = /^\s+|\s+$/g;
		   
		    if(revMoCon==''||revMoCon.replace(b2,'')==""){
				$(this).val(revMoCon.substring(0, 0));
			}else{
				 $('#revcounter').html("("+revMoCon.length+" / 최대 250자)"); 
				if (revMoCon.length > 250){
			        alert("최대 250자까지 입력 가능합니다.");
			        $(this).val(revMoCon.substring(0, 250));
			        $('#revcounter').html('(250 / 최대 250자)');
			    }
			}
		    ru_arr[0]=revMoCon.replace(/&/gi,'&amp;');
		});
		$('#revMoContent').focusout(function() {
			 var revMoCon = $(this).val();
			 $('#revcounter').html("("+revMoCon.length+" / 최대 250자)"); 
			    if (revMoCon.length > 250){
			        alert("최대 250자까지 입력 가능합니다.");
			        $(this).val(revMoCon.substring(0, 250));
			        $('#revcounter').html('(250 / 최대 250자)');
			    }
		});
		
		
		$('#rev_can_mo_btn').click(e=>{
			e.preventDefault();
			x.con.empty();
			board.page.d(x.d.bno);
		});
		
		$('#review_mo_btn').click(e=>{
			e.preventDefault();
			//댓 비번
			
			$('#revMoPass').keyup(function (e){
			    var rev_mo_pass = $(this).val();
			    if(rev_mo_pass==''){
					$(this).val(rev_mo_pass.substring(0, 0));
				}

			    if (rev_mo_pass.length > 8){
			     //   alert("문자,숫자,특수기호를 포함한 6~8자리로 입력해주세요.");
			        $(this).val(rev_mo_pass.substring(0, 8));
			    }
			    
			});
			
			
			$('#revMoPass').change(function(){
			    checkPassword($('#revMoPass').val());
			});
			function checkPassword(password){
			    var rev_mo_pass = $('#revMoPass').val();
			    if(!/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,8}$/.test(password)){            
			        alert('숫자+영문자+특수문자 조합으로 6-8자리 사용해야 합니다.');
			        $('#revMoPass').val('').focus();
			        return false;
			    }    
			    var checkNumber = password.search(/[0-9]/g);
			    var checkEnglish = password.search(/[a-z]/ig);
			    if(checkNumber <0 || checkEnglish <0){
			        alert("숫자와 영문자를 혼용하여야 합니다.");
			        $('#revMoPass').val('').focus();
			        return false;
			    }
			    if(/(\w)\1\1\1/.test(password)){
			        alert('같은 문자를 4번 이상 사용하실 수 없습니다.');
			        $('#revMoPass').val('').focus();
			        return false;
			    }
			    if (rev_mo_pass.length > 8){
		            alert("최대 8자까지 입력 가능합니다.");
		            $(this).val(rev_mo_pass.substring(0, 8));
			    }
			    if(rev_mo_pass==' '){
					$(this).val(rev_mo_pass.substring(0, 0));
				}
			    return true;
			}
			let remocon = $('#revMoContent').val();
			let revMoPass = $('#revMoPass').val();
				
			ru_arr[0]=$('#revMoContent').val();
				
			ru_arr[0]=remocon.replace(/&/gi,'&amp;');
				console.log('x.d.reviewSeq :: ',x.d.reviewSeq);
				if(ru_arr[0]==''||ru_arr[0]==null){
					alert('댓글 입력해 주세요');
					$('#revMoContent').focus();
				}else if($('#revMoPass').val()==''){
					alert('비밀번호를 입력해 주세요.');
					$('#revMoPass').focus();
				}else if($('#revMoPass').val()!=x.d.pass){
					alert('비밀번호가 틀렸습니다.');
					$('#revMoPass').focus();
				}else{
					$.ajax({
						url:$.context()+'/board/reUpdate',
						method:'PUT',
						contentType:'application/json',
						data: JSON.stringify({
							content:ru_arr[0],
							pass: $('#revMoPass').val(),
							reviewSeq:x.d.reviewSeq
						}),
						success:d=>{
							if(d.reModi==='WRONG'){
								alert('댓글 수정 오류입니다.');
							}else{
								board.page.d(x.d.bno);
							}
						}
					});	
					/*let ru_result = confirm('수정 완료하시겠습니까?');
					if(ru_result){
						//등록 눌렀을 때

					}else{
						//취소 눌렀을 때
					}*/
				}
		});
	}
	
};
jieun.func ={          
		 iu: d =>{  //이미지 업로드시 업로드한 파일 임시 저장 기능, 이미지 미리보기  
			var fd = new FormData();  
			fd.append('file',d.files[0]);  
			console.log('d.files[0] :: ',d.files[0]);
			$.ajax({            
				url: $.context()+'/board/upload',            
				type: 'POST',            
				data: fd,            
				async: false,            
				cache: false,            
				contentType: false,            
				processData: false   
			}).done(function(){             
				if (d.files[0]) {   
					var fileReader = new FileReader();   
					fileReader.onload = function (e) {                        
						$('#blah').attr('src', e.target.result); 
						}   
						fileReader.readAsDataURL(d.files[0]);            
					}  
				});           
			} 
		}

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