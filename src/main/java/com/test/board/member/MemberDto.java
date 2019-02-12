package com.test.board.member;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data @Lazy
public class MemberDto {
	private int mSeq;
	private String userId;
	private String name;
	private String age;
	private String password;
	private String profile;
	
	
	
}
