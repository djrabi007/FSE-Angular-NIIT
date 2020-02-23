package com.stackroute.keepnote.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@EnableWebSecurity
public class ApiSecurityConfig extends WebSecurityConfigurerAdapter{
	
	
	@Autowired
	private JwtAuthenticationEntrypoint unAuthorizedAccessHandler;
	
	@Bean
	public JwtAuthenticationEntrypoint jwtAuthenticationEntrypoint() {
		return new JwtAuthenticationEntrypoint();
	}
	
	@Bean
	public JwtAuthenticationFilter jwtAuthenticationFilter() {
		return new JwtAuthenticationFilter();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable()
			.exceptionHandling()
				.authenticationEntryPoint(unAuthorizedAccessHandler)
			.and()
				.sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
				.authorizeRequests()
				.antMatchers(allowList()).permitAll()
				.anyRequest().authenticated();
		
		
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers("/v2/api-docs", "/configuration/**", "/configuration/security", "/swagger-ui.html", "/swagger.json");
	}
	
	private String[] allowList() {
		String[] allowList = {
				"/webjars/**",
				"/swagger-resources/**",
				"/api/v1/**" 
				};
		
		return allowList;
	}
	
	
	
	

}
