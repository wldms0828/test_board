"use strict";
var board = board || {};
board = (()=>{
	var init=x=>{
		board.page.list();
	};
	return {init:init}
})();
board.page={
	list:()=>{
		$('#content').empty();
		$.getJSON($.context()+'/board/list',d=>{
			
			$('#content').html('<div id="list_table">'
					+'          <table class="table table-bordered">'
					+'            <tr id="board_tr_th">'
					+'              <th style="width: 10px">BNO</th>'
					+'              <th>TITLE</th>'
					+'              <th>CONTENT</th>'
					+'              <th>WRITER</th>'
					+'              <th>REGDATE</th>'
					+'              <th style="width: 40px">VIEWCNT</th>'
					+'            </tr>'					
					+'          </table>'
					+	'</div>');
			 $.each(d.list,(idx,y)=>{
				 $('<tr>').append(
						 $('<td>').html(y.bno),
						 $('<td>').html(y.title),
						 $('<td>').html(y.content),
						 $('<td>').html(y.writer),
						 $('<td>').html(y.regdate),
						 $('<td>').html(y.viewCnt)
				 ).appendTo($('tbody'));
				 //지은아 이거
				 //  
				 // 회사가서 멘붕올까봐 미리 말해줄게. appendTo가 내가 착각했는데 옆에 붙이는게 아니라 그 아이디 안에 붙이는거야.
				 // 저걸로 만들고 F12눌러서 확인해보면 <tr id="board_tr_th"> tr안에 새로 생긴 tr들이 잔뜩 들어간게 보일거야.
				 
				 //밑부터는 정답이야 직접 고쳐보고 싶으면 고쳐보고 그냥 답 보려면 밑에 봐
				 
				 
				 // 정답 주의
				 
				 
				 // 그래서 빼야하는데 어떻게 뺄가 생각해봤는데 테이블을 만들면 tbody가 알아서 생기나봐. 그래서 tbody밑에 붙이는걸로 바꾸는거야.
				 // ).appendTo($('#board_tr_th')); 대신에 ).appendTo($('tbody')); 이렇게 쓰면 제대로 생겨.
				 // 이 계층관계를 한번 그림으로 그려보든지 해봐 아가. 지은이가 충분히 할 수 있는거지만 혹시나 멘붕 올까봐 알려준당
				 
				
				 

			});
			 $('<div id="list_pagination" style="text-align:center;">').html('<nav>'
					 +'  <ul class="pagination">'
					 +'    <li>'
					 +'      <a href="#" aria-label="Previous">'
					 +'        <span aria-hidden="true">&laquo;</span>'
					 +'      </a>'
					 +'    </li>'
					 +'    <li><a href="#">1</a></li>'
					 +'    <li><a href="#">2</a></li>'
					 +'    <li><a href="#">3</a></li>'
					 +'    <li><a href="#">4</a></li>'
					 +'    <li><a href="#">5</a></li>'
					 +'    <li>'
					 +'      <a href="#" aria-label="Next">'
					 +'        <span aria-hidden="true">&raquo;</span>'
					 +'      </a>'
					 +'    </li>'
					 +'  </ul>'
					 +'</nav>').appendTo($('#content'));

		});
		
	}
}