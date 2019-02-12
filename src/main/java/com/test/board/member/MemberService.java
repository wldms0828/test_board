package com.test.board.member;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
@Service
public interface MemberService {
	public void addMember(MemberDto MemberDto);
	public List<MemberDto> list(Map<String, Object> map);
	public MemberDto retrieveMember(String id);
	//public MemberDto getArticle(int seq);
	public void modifyMember(MemberDto MemberDto);
	public void deleteMember(int seq);
}
