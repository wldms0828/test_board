package com.test.board.board;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;


import lombok.Data;


@Component
@Data @Lazy
public class BoardDto {
	private int bno;
	private String wirter;
	private String title;// 글제목
	private String content;
	private String viewCnt;
	private String regdate;
	
	
}
