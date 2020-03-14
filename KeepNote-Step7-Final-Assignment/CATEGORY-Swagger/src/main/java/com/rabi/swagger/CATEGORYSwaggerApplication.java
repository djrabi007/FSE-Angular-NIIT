package com.rabi.swagger;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class CATEGORYSwaggerApplication {

	public static void main(String[] args) {
		SpringApplication.run(CATEGORYSwaggerApplication.class, args);
	}

}
