package com.test.board.board;

import java.util.Map;

import lombok.Data;
@Data
public class PageProxy implements Proxy {
	private Pagination pagination;
	
	@Override
	public void carryOut(Map<?, ?> m) {
		this.pagination = new Pagination();
		pagination.carryOut(m);
		
	}

}
