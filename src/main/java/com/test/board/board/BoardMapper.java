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
	public List<HashMap<?,?>> getFileByBno(String bno);
	/*public int w_delete(BoardDto del);*/
	public int w_deleteYN(BoardDto del);
	public int w_modify(BoardDto u);
	//public int modiPass(BoardDto u);
	public BoardDto confirmPass(Map<?, ?> b);
	public List<HashMap<?, ?>> searchByList(Map<?, ?> list);
	public BoardDto getReListByBno(String bno);
	
	
	public int revWrite(ReviewDto review2);
	public List<HashMap<?,?>> revList(Map<?, ?> list);
	public List<HashMap<?,?>> revListByBno(String bno);
	public int revDel_deleteYN(ReviewDto re);
/*	public int revDel(ReviewDto re);
*/	public int revMo(ReviewDto u);
	public int relist_cnt(String bno);
	public int cnt_delYN(String bno);
	public List<HashMap<?,?>> getReview(Map<?, ?> list); 
	public ReviewDto revListBySeq(String seq);
	public int updateStep(BoardDto u);
	
	public void fileInsert (FileDTO f);
	public int searchBoardBno();
	public FileDTO findMfname(String fno);
	public int delFile(FileDTO f);
	
	public List<BoardDto> downExcel();
	public List<BoardDto> searchDownExcel(String w);
	
	
}
