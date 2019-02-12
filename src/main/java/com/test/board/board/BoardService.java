package com.test.board.board;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public interface BoardService {
	public int writeArticle(BoardDto boardDto);
	public List<BoardDto> list(Map<String, Object> map);
	public BoardDto viewArticle(int seq);
	public BoardDto getArticle(int seq);
	public void modifyArticle(BoardDto boardDto);
	public void deleteArticle(int seq);
}
