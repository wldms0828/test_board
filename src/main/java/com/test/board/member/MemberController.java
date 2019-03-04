package com.test.board.member;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/member")
public class MemberController {
	@Autowired MemberMapper mpr;
	@Autowired MemberDto member;
	
	@PostMapping("/add")
	public int addMember(@RequestBody MemberDto m ) {
	return mpr.add(m);
		
	}
	
	@PostMapping("/login")
	public Map<String, Object> login(@RequestBody MemberDto p) {
		String pwValid="WRONG";
		String idValid="WRONG";
		Map<String, Object> lmap = new HashMap<>();
		if(mpr.login(p)!=0) {
			idValid="CORRECT";
			Function<MemberDto, MemberDto> m = (t)->{return mpr.get(t);};
			member = m.apply(p);
			pwValid=(member!=null)? "CORRECT":"WRONG";
			member =(member!=null)?member: new MemberDto();
			
		}
			lmap.put("idValid", idValid);
			lmap.put("pwValid", pwValid);
			lmap.put("value", member);
		
		return lmap;
		
	}
}
