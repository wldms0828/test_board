package com.test.board.board;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;


@Component
@Data @Lazy
public class BoardDto {
	private int bno,groupid,parents,lev;
	private String writer,title,content,viewCnt,regdate,pass;

	
	
}
