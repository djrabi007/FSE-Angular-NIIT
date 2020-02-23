package com.stackroute.keepnote.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import com.stackroute.keepnote.exception.NoteServiceException;


@Component
public class JwtAuthenticationFilter extends GenericFilterBean {

	private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

	private static final String SWAGGER_HEADER = "swagger-ui.html";

	@Autowired
	private JwtTokenServiceImpl jwtTokenService;

	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
			throws IOException, ServletException {
		logger.debug("Jwt authentication filter - starts");

		HttpServletRequest request = (HttpServletRequest) req;
  		HttpServletResponse response = (HttpServletResponse) res;
  		
		if (isSwaggerRequest(request)) {
			logger.debug("Swagger request, skipping validation...");
		} else {
			logger.debug("Jwt authentication enabled...");
			validateAuthToken(request);
		} 
		chain.doFilter(request, response);

	}

	private boolean isSwaggerRequest(HttpServletRequest request) {
		boolean isSwaggerReq = false;
		if (null != request.getHeader("Referer") && request.getHeader("Referer").endsWith(SWAGGER_HEADER)
				|| request.getRequestURI().endsWith(SWAGGER_HEADER)) {
			isSwaggerReq = true;
		}
		return isSwaggerReq;
	}

	private void validateAuthToken(HttpServletRequest request) {

		String authroization = request.getHeader("authorization");
		if (StringUtils.hasText(authroization) && authroization.startsWith("Bearer ")) {
			if (!jwtTokenService.validateToken(authroization)) {
				throw new NoteServiceException("Invalid Autherization");
			}
		} else {
			throw new NoteServiceException("Invalid Autherization");
		}

	}

}
