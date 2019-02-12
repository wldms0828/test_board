package com.test.board.common;

import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository
public interface CommonDao {
	public int getNextSeq();
	public void updateHit(int seq);
	public int getNewArticleCount(int bcode);
	public int getTotalArticleCount(Map<String, String> map);
}
