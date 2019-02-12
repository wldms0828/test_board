package com.test.board.board;

import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;
@Data@Lazy
@Component
public class Pagination implements Proxy {
	int pageSize, blockSize, beginPage, endPage, pageCount, rowCount, blockCount
	,beginRow ,endRow, pageNum, preBlock, nextBlock;
	boolean existPrev, existNext;

	@Override
	public void carryOut(Map<?, ?> m) {
		this.pageSize = 5;
		this.blockSize = 5;
		this.pageNum = Integer.parseInt((m.get("pageNum").toString()));
		this.rowCount = (int) m.get("rowCount");
		this.pageCount = (rowCount%pageSize==0)? rowCount/pageSize : rowCount/pageSize+1;
		this.blockCount = (pageCount%blockSize==0)? pageCount/blockSize : pageCount/blockSize+1;
		
	}

}
