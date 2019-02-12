package com.test.board.board;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
public class BoardServiceImplement implements BoardService {
/*	@Autowired
	SqlSession sqlsession;*/
	
	
	@Override
	public int writeArticle(BoardDto boardDto) {
		/*int seq = sqlsession.getMapper(CommonDao.class).getNextSeq();
		boardDto.setSeq(seq);
		int cnt = sqlsession.getMapper(BoardDao.class).writeArticle(boardDto);
				*/
		return 0;
	}

	@Override
	public List<BoardDto> list(Map<String, Object> map) {
		return null;
	}

	@Override
	public BoardDto viewArticle(int seq) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public BoardDto getArticle(int seq) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void modifyArticle(BoardDto boardDto) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteArticle(int seq) {
		// TODO Auto-generated method stub
		
	}

	

}
