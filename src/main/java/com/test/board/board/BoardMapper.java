package com.test.board.board;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository
public interface BoardMapper {
	public List<HashMap<?,?>> getList(Map<?, ?> list); 
	public int list_cnt();
	public int list_Search_cnt(String s);
	public int write(BoardDto b);
	public int rewrite(BoardDto b);
	//public BoardDto get(String b);
	public BoardDto getListByBno(String bno);
	public int w_delete(BoardDto del);
	public int w_modify(BoardDto u);
	public BoardDto confirmPass(Map<?, ?> b);
	public List<HashMap<?, ?>> searchByList(Map<?, ?> list);

}
