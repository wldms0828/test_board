package com.test.board.board;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public interface BoardMapper {
	public List<HashMap<?,?>> getList(); 
}
