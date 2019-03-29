package com.test.board.board;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor.HSSFColorPredefined;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;


@RestController
@RequestMapping("/board")
public class BoardController {
	private BoardDto board;
	@Autowired BoardMapper bpr;
	@Autowired Pagination page;

	
	//---------------------
	// 사진 업로드
	@Resource(name="uploadPath")
	private String uploadPath;
	private byte[] filedata;
	
	@GetMapping("/list/{pn}/{word}")
	public Map<?,?> boardList(@PathVariable String pn,@PathVariable String word) {
		Map<String, Object> pmap = new HashMap<>();
/*		int delYN = bpr.cnt_delYN(bno);
		revList.put("rowCount", relist-delYN);*/
		
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
		
				
		if(!word.equals("e@5XdE6^")){
			pmap.put("word", word);
			pmap.put("list",bpr.searchByList(pmap));
			/*for(int i=0;i<((List<HashMap<String, Object>>)pmap.get("list")).size();i++) {
				System.out.println(
						(((List<HashMap<String, Object>>)pmap.get("list")).get(i)).get("writer")
			  );}*/
		}else {
			pmap.put("list", bpr.getList(pmap));
			/*for(int i=0;i<((List<HashMap<String, Object>>)pmap.get("list")).size();i++) {
				System.out.println(
						(((List<HashMap<String, Object>>)pmap.get("list")).get(i)).get("bno")
						);}*/
		}
		System.out.println("list :: "+pmap.get("list"));
		return pmap;
	}
	
	@PostMapping("/write")
	public Map<?, ?> write(MultipartHttpServletRequest param) {
		//MultipartHttpServletRequest 파일을 받는 페이지에 지정해줌
		Map<String, Object> wmap = new HashMap<>();
		//wmap.put("content",b.getContent());
		//wmap.put("title",b.getTitle());
		//wmap.put("writer",b.getWriter());
		//wmap.put("pass",b.getPass());
		System.out.println("param   :::: "+param.getParameter("content").getClass());
		BoardDto b=new BoardDto();
		//formdata에서 보낸 키값을 받아서 boardDto에 하나씩 넣어주는 형태
		b.setContent((param.getParameter("content")).toString());
		b.setTitle((String)param.getParameter("title"));
		b.setWriter((String)param.getParameter("writer"));
		b.setPass((String)param.getParameter("pass"));
		b.setLev(Integer.parseInt(param.getParameter("lev")));
		b.setParents(Integer.parseInt(param.getParameter("parents")));
		b.setStep(Integer.parseInt(param.getParameter("step")));
		int bMapper = bpr.write(b);
		String wSuccess = "WRONG";
		String w = "e@5XdE6^";
		if(bMapper != 0 ) {
			wSuccess="CORRECT";			
		}
		wmap.put("wSuccess", wSuccess);
		wmap.put("w",w );
		
		//bno중 가장 큰(최신값을) 값을 조회하는 쿼리
		int thisBoardBno=bpr.searchBoardBno();
		
		String path=uploadPath +"/upload/";
		FileDTO f = new FileDTO();
		//Iterator는 모든 컬렉션의 데이터를 읽을 때 사용
		Iterator<String> files = param.getFileNames();
		//hasNext()는 iterator 인터페이스 내부의 다음 데이터를 읽을 때 사용
		while(files.hasNext()) {
			String uploadFile = files.next();
			MultipartFile mFile = param.getFile(uploadFile);
			String originFileName = mFile.getOriginalFilename();
			
			System.out.println("어뤼지날퐈일네임 ::::: "+originFileName);
			String newFileName = path + System.currentTimeMillis() + originFileName;
			//파일 이름이 없어 질 때 즉 리스트의 다음 파일이 없는 경우..?
			if(!originFileName.equals("")) {
				try {
					mFile.transferTo(new File(newFileName));
	            } catch (Exception e) {
	                e.printStackTrace();
	            }
				long fileSize = mFile.getSize(); // 파일 사이즈
				f.setBno(thisBoardBno);
				f.setFname(originFileName);
	            f.setFsize(fileSize);
	            f.setMfname(newFileName);
	            bpr.fileInsert(f);
			}
		}
		return wmap;
	}
	//이건 안타는 중이고
	@PostMapping("/upload")
	public String fileUpload(MultipartHttpServletRequest mtfRequest){
		List<MultipartFile> fileList = mtfRequest.getFiles("file");
		FileDTO f = new FileDTO();
		for (MultipartFile mf : fileList) {
            String originFileName = mf.getOriginalFilename(); // 원본 파일 명
            long fileSize = mf.getSize(); // 파일 사이즈
            
            String path=uploadPath +"/upload/";
            String safeFile = path + System.currentTimeMillis() + originFileName;
            
            f.setFname(originFileName);
            f.setFsize(fileSize);
            f.setMfname(safeFile);
            bpr.fileInsert(f);
            try {
                mf.transferTo(new File(safeFile));
            } catch (IllegalStateException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
		
		//filedata = file.getBytes();
		return "";
	}
	
	@GetMapping("/detail/{dPage}")
	public Map<?, ?> detail(@PathVariable String dPage ,HttpServletResponse response) throws IOException{
		Map<String, Object> dmap = new HashMap<>();
/*		dmap.put("bno", dPage);
		BoardDto tmp= bpr.getListByBno(dPage);
		dmap.put("title", tmp.getTitle());
		dmap.put("content", tmp.getContent());
		dmap.put("writer", tmp.getWriter());
		dmap.put("viewcnt", tmp.getViewCnt());*/
		
		//DelYN 값으로 비교판단 해야하기 때문에 BoardDto값으로 아예 담아서 비교문을 작성해 준다.
		//map에 delyn값을 담아준 이유는
		//또 bpr.getListByBno(dPage);을 담아 준다면 DB를 두번갔다와야해서
		//메모리 소모가 많이 된다.
		BoardDto delyn =  bpr.getListByBno(dPage);
		List<HashMap<?, ?>> delyn2 =  bpr.getFileByBno(dPage);

		System.out.println("delyn :: "+delyn);
		System.out.println("delyn2 :: "+delyn2);
		System.out.println("delyn.getDelYN() :: "+delyn.getDelYN());
		
		dmap.put("list2", delyn2);
		if(delyn.getDelYN().equals("N")) {
			dmap.put("yn","N");
			dmap.put("d", delyn); 
			
		}else {
			dmap.put("yn","Y");
		}

		return dmap;
	}
	
	@RequestMapping(value="/contract/fileDownload/{fno}")
	public void fileDownload( @PathVariable String fno,  HttpServletResponse response, HttpServletRequest request) throws Exception  {
	
		String dFile = bpr.findMfname(fno).getMfname();
			  System.out.println("dFile :: "+bpr.findMfname(fno).getMfname());
			  String upDir = "C:\\Users\\jezza\\OneDrive\\Documents\\jieunzip_Workspace\\test\\src\\main\\webapp\\resources\\file\\upload";
			  String path = upDir+File.separator+dFile;
			 // String realName=bpr.findMfname(fno).getFname();
			  File file = new File(path);
			 // File file2 = new File(realName);
			  String userAgent = request.getHeader("User-Agent");
			  boolean ie = userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("rv:11") > -1;
			  String fileName = null;
			   
			  if (ie) {
			   fileName = URLEncoder.encode(file.getName(), "utf-8");
			  } else {
			   fileName = new String(file.getName().getBytes("utf-8"),"iso-8859-1");
			  }
			  
			  response.setContentType("application/octet-stream");
			  response.setHeader("Content-Disposition","attachment;filename=\"" +fileName.substring(13)+"\";");
			  
			  FileInputStream fis=new FileInputStream(file);
			  BufferedInputStream bis=new BufferedInputStream(fis);
			  ServletOutputStream so=response.getOutputStream();
			  BufferedOutputStream bos=new BufferedOutputStream(so);
			  
			  byte[] data=new byte[2048];
			  int input=0;
			  while((input=bis.read(data))!=-1){
			   bos.write(data,0,input);
			   bos.flush();
			  }
			  
			  if(bos!=null) bos.close();
			  if(bis!=null) bis.close();
			  if(so!=null) so.close();
			  if(fis!=null) fis.close();
			 }
			
	@PostMapping("/rewrite")
	public Map<?, ?> rewrite(@RequestBody BoardDto re){
		Map<String, Object> wmap = new HashMap<>();
		//wmap.put("content",b.getContent());
		//wmap.put("title",b.getTitle());
		//wmap.put("writer",b.getWriter());
		//wmap.put("pass",b.getPass());
		int stepUp = bpr.updateStep(re);
		int reMapper = bpr.rewrite(re);
		
		System.out.println("화면에서 넘어오는지? re - getGroupid:: "+ re.getGroupid());
		System.out.println("화면에서 넘어오는지? re - getLev :: "+ re.getLev());
		System.out.println("화면에서 넘어오는지? re - getParents:: "+ re.getParents());
		System.out.println("화면에서 넘어오는지? re - getPass:: "+ re.getPass());
		System.out.println("화면에서 넘어오는지? re - getStep:: "+ re.getStep());
		String reSuccess = "WRONG";
		System.out.println("stepUp :: "+stepUp);
		System.out.println("reMapper :: "+reMapper);
		if(stepUp !=0 && reMapper != 0  ) {
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
	
	@PostMapping("/modify")
	public Map<?, ?> modify(MultipartHttpServletRequest param){
		System.out.println("제발나와주세요...::"+ (String)param.getParameter("title"));
		System.out.println("제발...::"+ Integer.parseInt(param.getParameter("bno")));
		BoardDto m = new BoardDto();
		m.setTitle((String)param.getParameter("title"));
		m.setContent((String)param.getParameter("content"));
		m.setPass((String)param.getParameter("pass"));
		m.setBno(Integer.parseInt(param.getParameter("bno")));
		Map<String, Object> umap = new HashMap<>();
		String uSuc="WRONG";
		umap.put("u", bpr.w_modify(m));
		
		int uBoard=bpr.w_modify(m);
		if(uBoard != 0) {
			uSuc="CORRECT";
			String path=uploadPath +"/upload/";
			FileDTO f = new FileDTO();
			System.out.println("f ::::: "+f);
			Iterator<String> files = param.getFileNames();
			while(files.hasNext()) {
				String uploadFile = files.next();
				MultipartFile mFile = param.getFile(uploadFile);
				String originFileName = mFile.getOriginalFilename();
				
				System.out.println("어뤼지날퐈일네임 ::::: "+originFileName);
				String newFileName = path + System.currentTimeMillis() + originFileName;
				//파일 이름이 없어 질 때 즉 리스트의 다음 파일이 없는 경우..?
				if(!originFileName.equals("")) {
					try {
						mFile.transferTo(new File(newFileName));
		            } catch (Exception e) {
		                e.printStackTrace();
		            }
					long fileSize = mFile.getSize(); // 파일 사이즈
					f.setBno(Integer.parseInt(param.getParameter("bno")));
					f.setFname(originFileName);
		            f.setFsize(fileSize);
		            f.setMfname(newFileName);
		            bpr.fileInsert(f);
				}
			}
		}
		umap.put("uSuc", uSuc);
		
		//int boardBno=bpr.searchBoardBno();

		
		
		return umap;
	}
	@DeleteMapping("/modify2")
	public Map<?,?> modify2(@RequestBody FileDTO f){
		System.out.println("f :: "+f);
		Map<String, Object> map = new HashMap<>();
		String suc="WRONG";
		int fBoard=bpr.delFile(f);
		if(fBoard != 0) {
			suc="CORRECT";
		}
		map.put("suc", suc);
		
		return map;
	}
	//삭제된 게시물 표현 전 방식
/*	
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
	}*/
	
	@DeleteMapping("/delete")
	public Map<?, ?> delete(@RequestBody BoardDto delP) {
		// 삭제된 게시물 표시를 할떄는 클라이언트의 입장에서는 삭제되어서 보이지 않지만
		// 운영자 입장에서는 화면만 삭제되었고 원래의 게시물을 일정기간 보관해야하는 입장이기 때문
		// delYN이라는 컬럼으로 Y값이면 클라이언트는 삭제되어 확인할 수 없는 상태
		// delYN이라는 컬럼으로 N값이면 운영자는 DB에 원글 그대로 보관하고 있는 상태
		Map<String, Object> delMap = new HashMap<>();
		System.out.println("delP :: "+delP);
		String delSuc = "WRONG";
		
		int del=bpr.w_deleteYN(delP);
		System.out.println("del 1 :: "+del);
		if(del != 0) {
			delSuc="CORRECT";
		}
		delMap.put("delSuc", delSuc);
		System.out.println("del 2 :: "+del);
		System.out.println("delSuc :: "+delMap.get("delSuc"));
		return delMap;
	}
	
	
	
	@PostMapping("/search/{word}")
	public Map<?, ?> search(@RequestBody Map<String, Object> sear, @PathVariable String word){
	
		sear.get("word");
		System.out.println("sear"+sear.get("word"));
		sear.put("sList", bpr.searchByList(sear));
		return sear;
	}
	
	@GetMapping("/revList/{bno}/{pn}")
	public Map<?, ?> revList( @PathVariable String bno,@PathVariable String pn){
		Map<String, Object> revList = new HashMap<>();
		
		int relist = bpr.relist_cnt(bno);

		revList.put("pageNum", pn);
		revList.put("rowCount", relist);
		
		PageProxy pxy = new PageProxy();
		pxy.carryOut(revList);
		Pagination page1= pxy.getPagination();
		
		revList.put("page", page1);
		revList.put("beginRow", page1.beginRow);
		revList.put("endRow", page1.endRow);
		
	//	revList.put("revList", bpr.revListByBno(bno)); 이건 그냥 리스트
		revList.put("revList", bpr.getReview(revList));
		
		System.out.println("page :: "+revList.get("page"));
		System.out.println("beginRow :: "+revList.get("beginRow"));
		System.out.println("endRow :: "+revList.get("endRow"));
		System.out.println("pageNum :: "+revList.get("pageNum"));
		System.out.println("rowCount :: "+revList.get("rowCount"));
		System.out.println("revList :: "+revList.get("revList"));
		return revList;
	}
	
	@PostMapping("/revWrite")
	public Map<?, ?> revWrite(@RequestBody ReviewDto review2){
		Map<String, Object> revMap = new HashMap<>();
	
		int revW= bpr.revWrite(review2);
		String revWS = "WRONG";
		if(revW != 0) {
			revWS = "CORRECT";
		}
		revMap.put("revWS", revWS);
		return revMap;
	}
	@DeleteMapping("/redelete")
	public Map<?, ?> redelete(@RequestBody ReviewDto re) {
		Map<String, Object> rdelM = new HashMap<>();
		System.out.println("review re :: "+re);
		String rdel = "WRONG";
		
		int rdel1=bpr.revDel_deleteYN(re);
		if(rdel1 != 0) {
			rdel="CORRECT";
		}
		rdelM.put("rdel", rdel);
		System.out.println("rdel1 :: "+rdel1);
		System.out.println("rdelM :: "+rdelM.get("rdel"));
		
		return rdelM;
	}
	@GetMapping("/redetail/{seq}")
	public Map<?, ?> redetail(@PathVariable String seq){
		Map<String, Object> dremap = new HashMap<>();
		dremap.put("d", bpr.revListBySeq(seq)); 
		
		System.out.println("redetail :: "+dremap.get("d"));
		return dremap;
	}
	@PutMapping("/reUpdate")
	public Map<?, ?> reModify(@RequestBody ReviewDto re){
		Map<String, Object> reMo = new HashMap<>();
		String reModi = "WRONG";
		int reMoSuc = bpr.revMo(re);
		if(reMoSuc != 0) {
			reModi = "CORRECT";
		}
		reMo.put("reModi", reModi);
		
		return reMo; 
	}
	
	@RequestMapping(value="/excelDown/{w}")
	public void excelDown(HttpServletResponse response , @PathVariable String w) throws Exception {
	    // 게시판 목록조회
		System.out.println("w :: "+w);
		if(w.equals("e@5XdE6^")) {
			List<BoardDto> list = bpr.downExcel();
			System.out.println("list1 :: "+list);
			

		    // 워크북 생성

		    Workbook wb = new HSSFWorkbook();

		    Sheet sheet = wb.createSheet("게시판");

		    Row row = null;

		    Cell cell = null;

		    int rowNo = 0;



		    // 테이블 헤더용 스타일

		    CellStyle headStyle = wb.createCellStyle();

		    // 가는 경계선을 가집니다.

		    headStyle.setBorderTop(BorderStyle.THIN);

		    headStyle.setBorderBottom(BorderStyle.THIN);

		    headStyle.setBorderLeft(BorderStyle.THIN);

		    headStyle.setBorderRight(BorderStyle.THIN);



		    // 배경색은 노란색입니다.

		    headStyle.setFillForegroundColor(HSSFColorPredefined.YELLOW.getIndex());

		    headStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);



		    // 데이터는 가운데 정렬합니다.

		    headStyle.setAlignment(HorizontalAlignment.CENTER);



		    // 데이터용 경계 스타일 테두리만 지정

		    CellStyle bodyStyle = wb.createCellStyle();

		    bodyStyle.setBorderTop(BorderStyle.THIN);

		    bodyStyle.setBorderBottom(BorderStyle.THIN);

		    bodyStyle.setBorderLeft(BorderStyle.THIN);

		    bodyStyle.setBorderRight(BorderStyle.THIN);



		    // 헤더 생성

		    row = sheet.createRow(rowNo++);

		    cell = row.createCell(0);

		    cell.setCellStyle(headStyle);
		    sheet.setColumnWidth(0, 3000);
		    cell.setCellValue("BNO");

		    cell = row.createCell(1);

		    cell.setCellStyle(headStyle);
		    sheet.setColumnWidth(1, 15000);

		    cell.setCellValue("TITLE");

		    cell = row.createCell(2);

		    cell.setCellStyle(headStyle);
		    sheet.setColumnWidth(2, 3000);
		    cell.setCellValue("FILE");
		    
		    cell = row.createCell(3);

		    cell.setCellStyle(headStyle);
		    sheet.setColumnWidth(3, 3000);
		    cell.setCellValue("COMM");

		    cell = row.createCell(4);

		    cell.setCellStyle(headStyle);
		    sheet.setColumnWidth(4, 10000);
		    cell.setCellValue("WRITER");
		    
		    cell = row.createCell(5);

		    cell.setCellStyle(headStyle);
		    sheet.setColumnWidth(5, 3000);
		    cell.setCellValue("REGDATE");
		    
		    cell = row.createCell(6);

		    cell.setCellStyle(headStyle);
		    sheet.setColumnWidth(6, 3000);
		    cell.setCellValue("VIEWCNT");


		    // 데이터 부분 생성

		    for(BoardDto bo : list) {
		    	if(bo.getStep()!=0) {
		    		 row = sheet.createRow(rowNo++);
		 	        //BNO
		 	        cell = row.createCell(0);

		 	        cell.setCellStyle(bodyStyle);

		 	        cell.setCellValue("");
		 	        //TITLE
		 	        cell = row.createCell(1);

		 	        cell.setCellStyle(bodyStyle);

		 	        cell.setCellValue(bo.getTitle());
		 	        //FILE
		 	        cell = row.createCell(2);

		 	        cell.setCellStyle(bodyStyle);

		 	        cell.setCellValue(bo.getFileCnt());
		 	        
		 	        //COMMENT
		 	        cell = row.createCell(3);

		 	        cell.setCellStyle(bodyStyle);
		 	        
		 	        cell.setCellValue(bo.getCntRev());
		 	        
		 	        //WRITER
		 	        cell = row.createCell(4);

		 	        cell.setCellStyle(bodyStyle);

		 	        cell.setCellValue(bo.getWriter());
		 	        
		 	        //REGEDATE
		 	        cell = row.createCell(5);

		 	        cell.setCellStyle(bodyStyle);

		 	        cell.setCellValue(bo.getRegdate());
		 	        //VIEWCNT
		 	        cell = row.createCell(6);

		 	        cell.setCellStyle(bodyStyle);

		 	        cell.setCellValue(bo.getViewCnt());
		 	        
		    	}else if(bo.getStep()==0) {
		    		 row = sheet.createRow(rowNo++);
		 	        //BNO
		 	        cell = row.createCell(0);

		 	        cell.setCellStyle(bodyStyle);

		 	        cell.setCellValue(bo.getGroupid());
		 	        //TITLE
		 	        cell = row.createCell(1);

		 	        cell.setCellStyle(bodyStyle);

		 	        cell.setCellValue(bo.getTitle());
		 	        //FILE
		 	        cell = row.createCell(2);

		 	        cell.setCellStyle(bodyStyle);

		 	        cell.setCellValue(bo.getFileCnt());
		 	        
		 	        //COMMENT
		 	        cell = row.createCell(3);

		 	        cell.setCellStyle(bodyStyle);
		 	        
		 	        cell.setCellValue(bo.getCntRev());
		 	        
		 	        //WRITER
		 	        cell = row.createCell(4);

		 	        cell.setCellStyle(bodyStyle);

		 	        cell.setCellValue(bo.getWriter());
		 	        
		 	        //REGEDATE
		 	        cell = row.createCell(5);

		 	        cell.setCellStyle(bodyStyle);

		 	        cell.setCellValue(bo.getRegdate());
		 	        //VIEWCNT
		 	        cell = row.createCell(6);

		 	        cell.setCellStyle(bodyStyle);

		 	        cell.setCellValue(bo.getViewCnt());
		 	        
		    		
		    	}

		       
		        
		    }


		    // 컨텐츠 타입과 파일명 지정

		    response.setContentType("ms-vnd/excel");

		    response.setHeader("Content-Disposition", "attachment;filename=BoardList.xls");



		    // 엑셀 출력

		    wb.write(response.getOutputStream());

		    wb.close();
		}else {
			List<BoardDto> list = bpr.searchDownExcel(w);
			System.out.println("list2 :: "+list);
			

		    // 워크북 생성

		    Workbook wb = new HSSFWorkbook();

		    Sheet sheet = wb.createSheet("게시판");

		    Row row = null;

		    Cell cell = null;

		    int rowNo = 0;



		    // 테이블 헤더용 스타일

		    CellStyle headStyle = wb.createCellStyle();

		    // 가는 경계선을 가집니다.

		    headStyle.setBorderTop(BorderStyle.THIN);

		    headStyle.setBorderBottom(BorderStyle.THIN);

		    headStyle.setBorderLeft(BorderStyle.THIN);

		    headStyle.setBorderRight(BorderStyle.THIN);



		    // 배경색은 노란색입니다.

		    headStyle.setFillForegroundColor(HSSFColorPredefined.YELLOW.getIndex());

		    headStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);



		    // 데이터는 가운데 정렬합니다.

		    headStyle.setAlignment(HorizontalAlignment.CENTER);



		    // 데이터용 경계 스타일 테두리만 지정

		    CellStyle bodyStyle = wb.createCellStyle();

		    bodyStyle.setBorderTop(BorderStyle.THIN);

		    bodyStyle.setBorderBottom(BorderStyle.THIN);

		    bodyStyle.setBorderLeft(BorderStyle.THIN);

		    bodyStyle.setBorderRight(BorderStyle.THIN);



		    // 헤더 생성

		    row = sheet.createRow(rowNo++);

		    cell = row.createCell(0);

		    cell.setCellStyle(headStyle);
		    sheet.setColumnWidth(0, 3000);
		    cell.setCellValue("BNO");

		    cell = row.createCell(1);

		    cell.setCellStyle(headStyle);
		    sheet.setColumnWidth(1, 15000);

		    cell.setCellValue("TITLE");

		    cell = row.createCell(2);

		    cell.setCellStyle(headStyle);
		    sheet.setColumnWidth(2, 3000);
		    cell.setCellValue("FILE");
		    
		    cell = row.createCell(3);

		    cell.setCellStyle(headStyle);
		    sheet.setColumnWidth(3, 3000);
		    cell.setCellValue("COMM");

		    cell = row.createCell(4);

		    cell.setCellStyle(headStyle);
		    sheet.setColumnWidth(4, 10000);
		    cell.setCellValue("WRITER");
		    
		    cell = row.createCell(5);

		    cell.setCellStyle(headStyle);
		    sheet.setColumnWidth(5, 3000);
		    cell.setCellValue("REGDATE");
		    
		    cell = row.createCell(6);

		    cell.setCellStyle(headStyle);
		    sheet.setColumnWidth(6, 3000);
		    cell.setCellValue("VIEWCNT");


		    // 데이터 부분 생성

		    for(BoardDto bo : list) {
		    	
		    		 row = sheet.createRow(rowNo++);
		 	        //BNO
		 	        cell = row.createCell(0);

		 	        cell.setCellStyle(bodyStyle);

		 	        cell.setCellValue(bo.getRnum());
		 	        //TITLE
		 	        cell = row.createCell(1);

		 	        cell.setCellStyle(bodyStyle);

		 	        cell.setCellValue(bo.getTitle());
		 	        //FILE
		 	        cell = row.createCell(2);

		 	        cell.setCellStyle(bodyStyle);

		 	        cell.setCellValue(bo.getFileCnt());
		 	        
		 	        //COMMENT
		 	        cell = row.createCell(3);

		 	        cell.setCellStyle(bodyStyle);
		 	        
		 	        cell.setCellValue(bo.getCntRev());
		 	        
		 	        //WRITER
		 	        cell = row.createCell(4);

		 	        cell.setCellStyle(bodyStyle);

		 	        cell.setCellValue(bo.getWriter());
		 	        
		 	        //REGEDATE
		 	        cell = row.createCell(5);

		 	        cell.setCellStyle(bodyStyle);

		 	        cell.setCellValue(bo.getRegdate());
		 	        //VIEWCNT
		 	        cell = row.createCell(6);

		 	        cell.setCellStyle(bodyStyle);

		 	        cell.setCellValue(bo.getViewCnt());
		 	        
		    	
		    }


		    // 컨텐츠 타입과 파일명 지정

		    response.setContentType("ms-vnd/excel");

		    response.setHeader("Content-Disposition", "attachment;filename=SearchList.xls");

		    // 엑셀 출력

		    wb.write(response.getOutputStream());

		    wb.close();
		}
		
		


	}


	
}
