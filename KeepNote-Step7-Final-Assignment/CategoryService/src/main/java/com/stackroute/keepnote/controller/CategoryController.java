package com.stackroute.keepnote.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.keepnote.exception.CategoryDoesNoteExistsException;
import com.stackroute.keepnote.exception.CategoryNotCreatedException;
import com.stackroute.keepnote.exception.CategoryNotFoundException;
import com.stackroute.keepnote.model.Category;
import com.stackroute.keepnote.service.CategoryService;

/*
 * As in this assignment, we are working with creating RESTful web service, hence annotate
 * the class with @RestController annotation.A class annotated with @Controller annotation
 * has handler methods which returns a view. However, if we use @ResponseBody annotation along
 * with @Controller annotation, it will return the data directly in a serialized 
 * format. Starting from Spring 4 and above, we can use @RestController annotation which 
 * is equivalent to using @Controller and @ResposeBody annotation
 */
@RestController
//@CrossOrigin
@RequestMapping("/categoryservice")   //Added By Rabi
@CrossOrigin("http://localhost:4200") //Added By Rabi
public class CategoryController {
	
	private CategoryService categoryService;

	public CategoryController(@Autowired CategoryService categoryService) {
		super();
		this.categoryService = categoryService;
	}
	
	@PostMapping("/api/v1/category")
	public ResponseEntity<HttpStatus> createCategory(@RequestBody Category category, HttpSession session){
		
			try {
				categoryService.createCategory(category);
				return new ResponseEntity<HttpStatus>(HttpStatus.CREATED);
				 
			} catch (CategoryNotCreatedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return new ResponseEntity<HttpStatus>(HttpStatus.CONFLICT);
			}
		
	}
	
	@PutMapping("/api/v1/category/{id}")
	public ResponseEntity<HttpStatus> updateCategory( @RequestBody Category category,
			HttpSession session) {
		   Category fetchCategory = null;
			
				fetchCategory = categoryService.updateCategory(category, category.getId());
			
			    if(fetchCategory == null){
			    	return new ResponseEntity<HttpStatus>(HttpStatus.CONFLICT);
			    }
				return new ResponseEntity<HttpStatus>(HttpStatus.OK);
			
		

	}

	@DeleteMapping("/api/v1/category/{userId}/{categoryId}")
	public ResponseEntity<HttpStatus> deleteCategory(@PathVariable String userId,@PathVariable Long categoryId) {
			try {
				categoryService.deleteCategory(categoryId);
			} catch (CategoryDoesNoteExistsException e) {
				e.getMessage();
				return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
			}
			return null;
	}
	
	@GetMapping("/api/v1/category/{userId}/{categoryId}")
	public ResponseEntity<HttpStatus> getCategoryById(@PathVariable Long categoryId,@PathVariable String userId,
			HttpSession session) {
	
			
			try {
				categoryService.getCategoryById(categoryId);
			} catch (CategoryNotFoundException e) {
				// TODO Auto-generated catch block
				
				return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
			}
			return null;
				
				
			
	}
	@GetMapping("/api/v1/category/{userId}")
	public Object getAllCategoriesByUserId(@PathVariable String userId) {
		return categoryService.getAllCategoryByUserId(userId);
	}
	/*
	 * Autowiring should be implemented for the CategoryService. (Use
	 * Constructor-based autowiring) Please note that we should not create any
	 * object using the new keyword
	 */

	/*
	 * Define a handler method which will create a category by reading the
	 * Serialized category object from request body and save the category in
	 * database. Please note that the careatorId has to be unique.This
	 * handler method should return any one of the status messages basis on
	 * different situations: 
	 * 1. 201(CREATED - In case of successful creation of the category
	 * 2. 409(CONFLICT) - In case of duplicate categoryId
	 *
	 * 
	 * This handler method should map to the URL "/api/v1/category" using HTTP POST
	 * method".
	 */
	
	/*
	 * Define a handler method which will delete a category from a database.
	 * 
	 * This handler method should return any one of the status messages basis on
	 * different situations: 1. 200(OK) - If the category deleted successfully from
	 * database. 2. 404(NOT FOUND) - If the category with specified categoryId is
	 * not found. 
	 * 
	 * This handler method should map to the URL "/api/v1/category/{id}" using HTTP Delete
	 * method" where "id" should be replaced by a valid categoryId without {}
	 */

	
	/*
	 * Define a handler method which will update a specific category by reading the
	 * Serialized object from request body and save the updated category details in
	 * database. This handler method should return any one of the status
	 * messages basis on different situations: 1. 200(OK) - If the category updated
	 * successfully. 2. 404(NOT FOUND) - If the category with specified categoryId
	 * is not found. 
	 * This handler method should map to the URL "/api/v1/category/{id}" using HTTP PUT
	 * method.
	 */
	
	/*
	 * Define a handler method which will get us the category by a userId.
	 * 
	 * This handler method should return any one of the status messages basis on
	 * different situations: 1. 200(OK) - If the category found successfully. 
	 * 
	 * 
	 * This handler method should map to the URL "/api/v1/category" using HTTP GET method
	 */


}
