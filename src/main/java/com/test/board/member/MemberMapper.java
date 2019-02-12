package com.test.board.member;

import org.springframework.stereotype.Repository;

@Repository
public interface MemberMapper {
	public int add(MemberDto m);
	public int login(MemberDto p);
	public MemberDto get(MemberDto m);
}
