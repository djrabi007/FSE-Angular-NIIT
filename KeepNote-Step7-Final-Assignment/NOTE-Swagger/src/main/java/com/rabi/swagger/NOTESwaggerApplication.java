package com.rabi.swagger;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class NOTESwaggerApplication {

	public static void main(String[] args) {
		SpringApplication.run(NOTESwaggerApplication.class, args);
	}

}
