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
	@Autowired MemberService memberService;
	@Autowired MemberMapper mpr;
	@Autowired MemberDto member;
	
	@PostMapping("/add")
	public int addMember(@RequestBody MemberDto m ) {
		/*map.put("userId", m.get);
		map.put("password", mpr.add(map));
		map.put("name", mpr.add(map));
		map.put("age", mpr.add(map)); 얘는 따로 담을 필요가 없어요! 왜냐면 m에 값이 담겨있기 때문이죠*/
	
		/*	mpr.add(m); 얘는 실행되고 나서 값이 있지만 따로 어디에 담아두지는 않은것*/
		
		//int a= mpr.add(m); //앞에 뭐가 있더라도 실행은 된것 다만 int a; 라는 것에 담았을 뿐!
		
		/*if(mpr.add(m)==1) {
			map.put("SUCCESS", "SUCCESS");
		}else {
			map.put("SUCCESS", "FAIL");
		}*/
		
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
