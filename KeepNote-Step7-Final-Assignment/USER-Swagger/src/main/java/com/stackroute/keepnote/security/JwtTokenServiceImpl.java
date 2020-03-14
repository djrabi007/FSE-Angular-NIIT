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
	public String generateToken(String userName,String password) {
		String jwtToken = null;
		jwtToken = Jwts.builder()
				.setSubject(userName).setSubject(password)
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis()+TOKEN_EXPIARATION))
				.signWith(SignatureAlgorithm.HS256, secret).compact();
		
		String prefixedToken = TOKEN_PREFIX+jwtToken;
		
		logger.debug("------------------>> Generated token: {}", prefixedToken);
		
		return prefixedToken;
	}

}
