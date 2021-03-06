package com.test.board.board;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;


@Component
@Data @Lazy
public class BoardDto {
	private int bno,groupid,parents,lev,step,cntRev,fileCnt,rnum;
	private String writer,title,content,viewCnt,regdate,pass,delYN;
}
