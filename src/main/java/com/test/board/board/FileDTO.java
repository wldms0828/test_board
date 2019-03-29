package com.test.board.board;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data @Lazy
public class FileDTO {
	int fno,bno;
	String fname,mfname;
	long fsize;
}
