package com.test.board.member;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
@Component
public class MemberServiceImpl implements MemberService{
	
	@Autowired MemberDto memberDto;

	@Override
	public void addMember(MemberDto MemberDto) {
		
	
	}

	@Override
	public List<MemberDto> list(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public MemberDto retrieveMember(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void modifyMember(MemberDto MemberDto) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteMember(int seq) {
		// TODO Auto-generated method stub
		
	}

}
