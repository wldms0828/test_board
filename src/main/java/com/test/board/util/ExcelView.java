package com.test.board.util;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;

import com.test.board.board.BoardDto;
import com.test.board.board.BoardMapper;

public class ExcelView extends AbstractExcelView{
	@Autowired  BoardMapper bpr;
	
	
    @Override
    protected void buildExcelDocument(Map<String,Object> model , Workbook workbook , HttpServletRequest request , HttpServletResponse response) throws Exception{
        
        String type = model.get("excelType").toString();
        
            if(type.equals("board")){
           //얘잠깐막음
            List<BoardDto> excelList = bpr.downExcel();
            Sheet sheet = workbook.createSheet(type);
            Row row = null;
            int rowCount = 0;
            int cellCount = 0;
            
            row = sheet.createRow(rowCount++);

            row.createCell(cellCount++).setCellValue("번호");
            row.createCell(cellCount++).setCellValue("제목");
            row.createCell(cellCount++).setCellValue("작성자");
            row.createCell(cellCount++).setCellValue("작성일");
            row.createCell(cellCount++).setCellValue("조회수");

            for(BoardDto board : excelList){
                row = sheet.createRow(rowCount++);
                cellCount = 0;
                row.createCell(cellCount++).setCellValue(board.getGroupid());
                row.createCell(cellCount++).setCellValue(board.getTitle());
                row.createCell(cellCount++).setCellValue(board.getWriter());
                row.createCell(cellCount++).setCellValue(board.getRegdate());
                row.createCell(cellCount++).setCellValue(board.getViewCnt());
            }
        }
    }
    @Override
    protected Workbook createWorkbook(){
        return new XSSFWorkbook();
    }
}