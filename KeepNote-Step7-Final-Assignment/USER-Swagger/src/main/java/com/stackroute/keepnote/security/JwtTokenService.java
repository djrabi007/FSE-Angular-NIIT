package com.stackroute.keepnote.security;

public interface JwtTokenService {
	
	
	String generateToken(String userName,String password);
	
	
}
