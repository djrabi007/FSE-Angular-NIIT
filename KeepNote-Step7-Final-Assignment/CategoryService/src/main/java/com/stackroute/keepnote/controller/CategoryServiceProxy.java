package com.stackroute.keepnote.controller;

import javax.servlet.http.HttpSession;

//import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.stackroute.keepnote.model.Category;

//@FeignClient(name="CategoryService" )
public interface CategoryServiceProxy {

	
	@PostMapping("/api/v1/category")
	public ResponseEntity<HttpStatus> createCategory(@RequestBody Category category, HttpSession session);
	
	@PutMapping("/api/v1/category/{id}")
	public ResponseEntity<HttpStatus> updateCategory( @RequestBody Category category,
			HttpSession session);

	@DeleteMapping("/api/v1/category/{id}")
	public ResponseEntity<HttpStatus> deleteCategory(@PathVariable String id);
	
	@GetMapping("/api/v1/category/{id}")
	public ResponseEntity<HttpStatus> getCategoryById(@PathVariable String id,
			HttpSession session) ;
	
	
}
