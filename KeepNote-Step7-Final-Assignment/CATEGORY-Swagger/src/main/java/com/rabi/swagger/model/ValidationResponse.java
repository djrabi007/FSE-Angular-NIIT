package com.rabi.swagger.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ValidationResponse {
	
	private int count;
	private List<Map<String, String>> mapList=new ArrayList<>();
	private List<String> errorList=new ArrayList<>();
	

	public ValidationResponse() {
		
	}

	
	public List<String> getErrorList() {
		return errorList;
	}


	public void setErrorList(List<String> errorList) {
		this.errorList = errorList;
	}


	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public List<Map<String, String>> getMapList() {
		return mapList;
	}

	public void setMapList(List<Map<String, String>> mapList) {
		this.mapList = mapList;
	}
	
	
	
	
	
}
