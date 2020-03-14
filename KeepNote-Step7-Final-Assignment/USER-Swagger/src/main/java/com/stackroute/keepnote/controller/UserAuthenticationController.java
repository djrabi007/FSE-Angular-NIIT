package com.stackroute.keepnote.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.keepnote.exception.UserAlreadyExistsException;
import com.stackroute.keepnote.exception.UserNotFoundException;
import com.stackroute.keepnote.model.User;
import com.stackroute.keepnote.security.JwtTokenService;
import com.stackroute.keepnote.service.UserAuthenticationService;


/*
 * As in this assignment, we are working on creating RESTful web service, hence annotate
 * the class with @RestController annotation. A class annotated with the @Controller annotation
 * has handler methods which return a view. However, if we use @ResponseBody annotation along
 * with @Controller annot9100ation, it will return the data directly in a serialized 
 * format. Starting from Spring 4 and above, we can use @RestController annotation which 
 * is equivalent to using @Controller and @ResposeBody annotation
 */
@RestController
//@CrossOrigin(origins="*")
@RequestMapping("/AuthenticationService")   //Added By Rabi
@CrossOrigin("http://localhost:4200") //Added By Rabi
public class UserAuthenticationController {

    /*
	 * Autowiring should be implemented for the UserAuthenticationService. (Use Constructor-based
	 * autowiring) Please note that we should not create an object using the new
	 * keyword
	 */
    private UserAuthenticationService authicationService;
    @Autowired
    private JwtTokenService jwtTokenService;

    public UserAuthenticationController(@Autowired UserAuthenticationService authicationService) {
    	this.authicationService = authicationService;
	}
    
    @PostMapping("/api/v1/auth/register")
    public ResponseEntity<HttpStatus> createUser(@RequestBody User user){
    	
    	try {
			authicationService.saveUser(user);
		} catch (UserAlreadyExistsException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return new ResponseEntity<HttpStatus>(HttpStatus.CONFLICT); 
		}
    	return new ResponseEntity<HttpStatus>(HttpStatus.CREATED); 
    	
    	
    }
   
    
    @PostMapping("/api/v1/auth/login")
    public Object authenticateUser(@RequestBody User user){
    	
    	try {
			authicationService.findByUserIdAndPassword(user.getUserId(), user.getUserPassword());
		} catch (UserNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return new ResponseEntity<HttpStatus>(HttpStatus.UNAUTHORIZED); 
		}
    	try {
			return  "{\"userAuthtoken\":"+"\""+jwtTokenService.generateToken(user.getUserId(), user.getUserPassword())/*((jwtTokenService != null)?jwtTokenService.generateToken(user.getUserId(), user.getUserPassword()):null)*/+"\""+"}";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null; 
    	
    	
    }
    
/*
	 * Define a handler method which will create a specific user by reading the
	 * Serialized object from request body and save the user details in the
	 * database. This handler method should return any one of the status messages
	 * basis on different situations:
	 * 1. 201(CREATED) - If the user created successfully. 
	 * 2. 409(CONFLICT) - If the userId conflicts with any existing user
	 * 
	 * This handler method should map to the URL "/api/v1/auth/register" using HTTP POST method
	 */




	/* Define a handler method which will authenticate a user by reading the Serialized user
	 * object from request body containing the username and password. The username and password should be validated 
	 * before proceeding ahead with JWT token generation. The user credentials will be validated against the database entries. 
	 * The error should be return if validation is not successful. If credentials are validated successfully, then JWT
	 * token will be generated. The token should be returned back to the caller along with the API response.
	 * This handler method should return any one of the status messages basis on different
	 * situations:
	 * 1. 200(OK) - If login is successful
	 * 2. 401(UNAUTHORIZED) - If login is not successful
	 * 
	 * This handler method should map to the URL "/api/v1/auth/login" using HTTP POST method
	*/




}
