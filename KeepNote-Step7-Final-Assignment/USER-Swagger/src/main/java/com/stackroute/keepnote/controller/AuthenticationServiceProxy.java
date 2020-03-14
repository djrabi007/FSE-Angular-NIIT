package com.stackroute.keepnote.controller;

//import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.stackroute.keepnote.model.User;

//@FeignClient(name="AuthenticationService" )
public interface AuthenticationServiceProxy {

	
	@PostMapping("/api/v1/auth/register")
    public ResponseEntity<HttpStatus> createUser(@RequestBody User user);
	
	@PostMapping("/api/v1/auth/login")
    public Object authenticateUser(@RequestBody User user);
	/*
	@GetMapping("/hello")
    public String helo();*/
}
