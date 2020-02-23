package com.stackroute.keepnote;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.ribbon.RibbonClient;

import com.stackroute.keepnote.config.RibbonConfig;
 
@EnableDiscoveryClient
@SpringBootApplication
@RibbonClient(name = "server", configuration = RibbonConfig.class)
public class RibbonConfigurationApplication {
 
    public static void main(String[] args) {
        SpringApplication.run(RibbonConfigurationApplication.class, args);
    }
}