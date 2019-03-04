package com.test.board.board;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringEscapeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Resource(name="BoardDto")
@RequestMapping("/board")
public class BoardController {
	private BoardDto board;
	@Autowired BoardMapper bpr;
	@Autowired Pagination page;
	
	@GetMapping("/list/{pn}/{word}")
	public Map<?,?> boardList(@PathVariable String pn,@PathVariable String word) {
		Map<String, Object> pmap = new HashMap<>();
		pmap.put("word", word);
		
		pmap.put("pageNum", pn);
		if(!word.equals("e@5XdE6^")){
			pmap.put("rowCount", bpr.list_Search_cnt(word));
		}else {
			pmap.put("rowCount", bpr.list_cnt());
		}
		PageProxy pxy = new PageProxy();
		pxy.carryOut(pmap);
		Pagination page= pxy.getPagination();
		pmap.put("page", page);
		pmap.put("beginRow", page.beginRow);
		pmap.put("endRow", page.endRow);
		
		System.out.println("endRow :: "+ page.endRow);
		if(!word.equals("e@5XdE6^")){
			pmap.put("word", word);
			pmap.put("list",bpr.searchByList(pmap));
			/*for(int i=0;i<((List<HashMap<String, Object>>)pmap.get("list")).size();i++) {
				System.out.println(
						(((List<HashMap<String, Object>>)pmap.get("list")).get(i)).get("writer")
						);
			}*/
		}else {
			pmap.put("list", bpr.getList(pmap));
		}
		return pmap;
	}
	
	@PostMapping("/write")
	public Map<?, ?> write(@RequestBody BoardDto b){
		Map<String, Object> wmap = new HashMap<>();
		//wmap.put("content",b.getContent());
		//wmap.put("title",b.getTitle());
		//wmap.put("writer",b.getWriter());
		//wmap.put("pass",b.getPass());
		int bMapper = bpr.write(b);
		System.out.println("화면에서 넘어오는지? getGroupid:: "+ b.getGroupid());
		System.out.println("화면에서 넘어오는지? getLev :: "+ b.getLev());
		System.out.println("화면에서 넘어오는지? getParents:: "+ b.getParents());	
		System.out.println("화면에서 넘어오는지? getPass:: "+ b.getPass());
		System.out.println("제목 : "+ b.getTitle());
		System.out.println("작성자 : "+ b.getWriter());
		System.out.println("내용 : "+ b.getContent());
		String wSuccess = "WRONG";
		String w = "e@5XdE6^";
		if(bMapper != 0 ) {
			wSuccess="CORRECT";			
		}
		wmap.put("wSuccess", wSuccess);
		wmap.put("w",w );
		return wmap;
	}
	
	@GetMapping("/detail/{dPage}")
	public Map<?, ?> detail(@PathVariable String dPage){
		Map<String, Object> dmap = new HashMap<>();
/*		dmap.put("bno", dPage);
		BoardDto tmp= bpr.getListByBno(dPage);
		dmap.put("title", tmp.getTitle());
		dmap.put("content", tmp.getContent());
		dmap.put("writer", tmp.getWriter());
		dmap.put("viewcnt", tmp.getViewCnt());*/
		
		dmap.put("d", bpr.getListByBno(dPage)); 
		
		return dmap;
	}
	
	@PostMapping("/rewrite")
	public Map<?, ?> rewrite(@RequestBody BoardDto re){
		Map<String, Object> wmap = new HashMap<>();
		//wmap.put("content",b.getContent());
		//wmap.put("title",b.getTitle());
		//wmap.put("writer",b.getWriter());
		//wmap.put("pass",b.getPass());
		int reMapper = bpr.rewrite(re);
		System.out.println("화면에서 넘어오는지? getGroupid:: "+ re.getGroupid());
		System.out.println("화면에서 넘어오는지? getLev :: "+ re.getLev());
		System.out.println("화면에서 넘어오는지? getParents:: "+ re.getParents());
		System.out.println("화면에서 넘어오는지? getPass:: "+ re.getPass());
		String reSuccess = "WRONG";
		if(reMapper != 0 ) {
			reSuccess="CORRECT";			
		}
		wmap.put("reSuccess", reSuccess);
		return wmap;
	}
	
	@PostMapping("/pass")
	public Map<?, ?> pass(@RequestBody BoardDto p){//2자바에서 받았다
		Map<String, Object> pmap = new HashMap<>();
		String pSuc="WRONG";
		//pmap.put("pass", p.getPass());
		//pmap.put("bno", p.getBno());
		board=bpr.confirmPass(pmap);
		if(board != null) {
			pSuc="CORRECT";
		}
		//System.out.println("pass : "+bpr.pass(p));
		//System.out.println("p.getPass()"+p.getPass());
		//System.out.println("p.getBno()"+p.getBno());
		//pmap.put("pass", bpr.confirmPass(p));
		pmap.put("pSuc", pSuc); // 확인 성공 여부
		System.out.println("pmap"+pmap);
		return pmap;//3자바에서 보낸다
	}
	
	@PutMapping("/modify")
	public Map<?, ?> modify(@RequestBody BoardDto m){
		Map<String, Object> umap = new HashMap<>();
		String uSuc="WRONG";
		umap.put("u", bpr.w_modify(m));
		int uBoard=bpr.w_modify(m);
		if(uBoard != 0) {
			uSuc="CORRECT";
		}
		umap.put("uSuc", uSuc);
		return umap;
	}
	
	
	@DeleteMapping("/delete")
	public Map<?, ?> delete(@RequestBody BoardDto delP) {
		Map<String, Object> delMap = new HashMap<>();
		String delSuc = "WRONG";
		
		int del=bpr.w_delete(delP);
		if(del != 0) {
			delSuc="CORRECT";
		}
		delMap.put("delSuc", delSuc);
		return delMap;
	}
	
	@PostMapping("/search/{word}")
	public Map<?, ?> search(@RequestBody Map<String, Object> sear, @PathVariable String word){
	
		sear.get("word");
		System.out.println("sear"+sear.get("word"));
		sear.put("sList", bpr.searchByList(sear));
		return sear;
	}
	

}
