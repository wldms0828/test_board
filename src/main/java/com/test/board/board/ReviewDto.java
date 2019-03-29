package com.test.board.board;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data @Lazy
public class ReviewDto {
	int bno, reviewSeq;
	String writer, regdate,pass,content,delYN;
}
