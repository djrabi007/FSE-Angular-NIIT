package com.stackroute.keepnote.security;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtTokenServiceImpl implements JwtTokenService{
	
	private static final Logger logger = LoggerFactory.getLogger(JwtTokenServiceImpl.class);
	
	private static final String TOKEN_PREFIX = "Bearer ";
	private static final long TOKEN_EXPIARATION = 10 * 24 * 60 * 60 * 1000;
	
	
	@Value("${jwt.security.secret}")
	private String secret;


	@Override
	public String generateToken(String subject) {
		String jwtToken = null;
		jwtToken = Jwts.builder()
				.setSubject(subject)
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis()+TOKEN_EXPIARATION))
				.signWith(SignatureAlgorithm.HS256, secret).compact();
		
		String prefixedToken = TOKEN_PREFIX+jwtToken;
		
		logger.debug("------------------>> Generated token: {}", prefixedToken);
		
		return prefixedToken;
	}

	@Override
	public String getSubjectFromClaim(String token) {
		final String subject = Jwts.parser().setSigningKey(secret).parseClaimsJws(token.substring(7)).getBody().getSubject();
		
		logger.debug("------------------>> Subject: {}", subject);
		
		return subject;
	}

	@Override
	public boolean validateToken(String token) {
		boolean isTokenValid = false ;
		try {
			Jwts.parser().setSigningKey(secret).parseClaimsJws(token.substring(7));
			isTokenValid = true;
		} catch (Exception e) {
			logger.error("Invalid token error, unbale to parse token");
		}
		logger.debug("------------------>> Authroization token validated");
		
		return isTokenValid;
	}
	
	

}
