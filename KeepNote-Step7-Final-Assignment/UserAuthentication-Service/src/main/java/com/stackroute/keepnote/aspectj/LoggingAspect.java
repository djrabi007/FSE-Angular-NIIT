package com.stackroute.keepnote.aspectj;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/* Annotate this class with @Aspect and @Component */
@Aspect
@Component
public class LoggingAspect {
	/*
	 * Write loggers for each of the methods of Category controller, any particular method
	 * will have all the four aspectJ annotation
	 * (@Before, @After, @AfterReturning, @AfterThrowing).
	 */
	
final static Logger logger = LoggerFactory.getLogger(LoggingAspect.class);
	
	private ThreadLocal<SimpleDateFormat> sdf = new ThreadLocal<SimpleDateFormat>() {
        @Override
        protected SimpleDateFormat initialValue() {
            return new SimpleDateFormat("[yyyy-mm-dd hh:mm:ss:SSS]");
        }
    };
	
	@Pointcut("execution(* com.stackroute.keepnote.controller.UserAuthenticationController.*(..))")
	public void uac(){}
	
	@Before("uac()")
    public void logBeforeUaC(JoinPoint jp) {
        String methodName = jp.getSignature().getName();
        logger.info(sdf.get().format(new Date()) +"Before "+methodName);
    }
	
	@After("uac()")
    public void logAfterUaC(JoinPoint jp) {
        String methodName = jp.getSignature().getName();
        logger.info(sdf.get().format(new Date()) +"After "+methodName);
    }
	
	@AfterReturning("uac()")
    public void logAfterReturningUaC(JoinPoint jp) {
        String methodName = jp.getSignature().getName();
        logger.info(sdf.get().format(new Date()) +"AfterReturning "+methodName);
    }
	
	@AfterThrowing("uac()")
    public void logAfterThrowingUaC(JoinPoint jp) {
        String methodName = jp.getSignature().getName();
        logger.info(sdf.get().format(new Date()) +"AfterThrowing "+methodName);
    }
}
