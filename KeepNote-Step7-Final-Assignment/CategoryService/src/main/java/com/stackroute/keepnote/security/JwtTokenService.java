package com.stackroute.keepnote.security;

public interface JwtTokenService {
	
	String generateToken(String subject);
	
	String getSubjectFromClaim(String token);
	
	boolean validateToken(String token);

}
