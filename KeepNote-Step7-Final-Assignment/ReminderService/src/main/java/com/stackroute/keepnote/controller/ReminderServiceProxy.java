package com.stackroute.keepnote.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

//import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.stackroute.keepnote.model.Reminder;

//@FeignClient(name="ReminderService" )
public interface ReminderServiceProxy {

	
	@PostMapping("/api/v1/reminder")
	public ResponseEntity<HttpStatus> createReminder(@RequestBody Reminder reminder, HttpSession session);
	
	@PutMapping("/api/v1/reminder/{id}")
	public ResponseEntity<HttpStatus> updateReminder( @RequestBody Reminder reminder,
			HttpSession session) ;

	@DeleteMapping("/api/v1/reminder/{id}")
	public ResponseEntity<HttpStatus> deleteReminder(@PathVariable String id) ;
	@GetMapping("/api/v1/reminder")
	public List<Reminder> getAllReminderById(@RequestBody List<Reminder> reminder,
			HttpSession session) ;
	@GetMapping("/api/v1/reminder/{id}")
	public ResponseEntity<HttpStatus> getReminderById(@PathVariable String id,
			HttpSession session);
	
	
}
