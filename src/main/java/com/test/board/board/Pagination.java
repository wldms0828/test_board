package com.test.board.board;

import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;
@Data@Lazy
@Component
public class Pagination implements Proxy {
	int pageSize, blockSize, beginPage, endPage, pageCount, rowCount, blockCount
	,beginRow ,endRow,laaaast, pageNum, preBlock, nextBlock,firstPage,totalPage,lastPage;
	boolean existPrev, existNext;

	@Override
	public void carryOut(Map<?, ?> m) {
		
		this.pageSize = 5; // 한 페이지에 보여지는 글의 수
		this.blockSize = 5; // 한 블록에 들어가는 페이지 수
		this.pageNum = Integer.parseInt((String) (m.get("pageNum"))); // 페이지 번호
		this.rowCount = (int) m.get("rowCount"); // 총 게시글의 수
		  
		this.pageCount = (rowCount%pageSize==0)? rowCount/pageSize : rowCount/pageSize+1; //페이지의 수
		this.blockCount = (pageCount%blockSize==0)? pageCount/blockSize : pageCount/blockSize+1; // 블록의 수
		
		this.beginRow = (pageNum-1)*pageSize +1; // 블록에 따른 시작 게시물 만약, 2page 의 첫 게시물은  6번째 글
		this.endRow = beginRow+pageSize-1;//블록에 따른 마지막 게시물 만약, 2page 마지막 게시물은 10번째 글

		
		this.beginPage = pageNum-((pageNum-1)%blockSize);// 시작 페이지 ex)1,6,11...
		//왜냐하면 산술연산자 %가 나머지 값을 뽑아내는 것이기 때문이다.
		this.endPage = ((beginPage + pageSize -1)<pageCount)? beginPage+blockSize-1 : pageCount; // 끝페이지 5,10,15 ...
		
		this.preBlock = beginPage-blockSize; // 이전 버튼
		this.nextBlock = beginPage + blockSize; // 다음 버튼
		this.existPrev = (preBlock>=0); // 이전 버튼 생성 여부
		this.existNext=(nextBlock <= pageCount ); // 다음버튼 생성 여부
		if(blockCount != 1 && blockCount != 0) {
			this.firstPage=1; //맨앞
			//this.lastPage=(totalPage>endPage)?totalPage+1:totalPage+1; //맨뒤
			this.lastPage = (rowCount%pageSize)>0? (rowCount/pageSize)+1 : rowCount/pageSize; //맨뒤
		}
		
		if(endRow>rowCount) {
			endRow = rowCount;
		}
		
		
	// 결국 우리가 페이징을 짜면서 변수를 선언하고 계산하고 하는 이유는 beginRow,endRow,beginPage,endPage를 구하기 위해서이다.
	// 결론적으로 내가 짠 페이징에서는 현재 블록을 구하는 변수와 식은 필요하지 않다.
	// 하지만 다른 페이징 패턴에서는 꼭 현재블록을 구하는 식이 필요할 수 있다.
		
	}

}
