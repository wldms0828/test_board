package com.test.board.board;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/board")
public class BoardController {
	@Autowired BoardService boardService;
	@Autowired BoardMapper bpr;
	@Autowired HashMap<String, Object> bmap;  //★★★여기가 그냥 Map<String, Object> 였어, 이건 json이 인식을 못해
	
	@RequestMapping("/list")
	public Map<?,?> boardList() {
		
		bmap.put("list", bpr.getList());
		//bpr.getList() 는 db를 갔다오라는 것이기 떄문에 조건문에 걸면안됀다.
		
	/*	if(((List<BoardDto>)bmap.get("list")).get(2).getTitle()!=null) {
			bmap.put("suc", "y");
		}else {
			bmap.put("suc", "n");
		}*/
		//System.out.println(((List<BoardDto>)bmap.get("list")).get(2).getTitle());
		return bmap;
	}
}
