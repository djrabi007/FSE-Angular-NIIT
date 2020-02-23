package com.stackroute.keepnote.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.keepnote.exception.ReminderNotCreatedException;
import com.stackroute.keepnote.exception.ReminderNotFoundException;
import com.stackroute.keepnote.model.Reminder;
import com.stackroute.keepnote.service.ReminderService;

/*
 * As in this assignment, we are working with creating RESTful web service, hence annotate
 * the class with @RestController annotation.A class annotated with @Controller annotation
 * has handler methods which returns a view. However, if we use @ResponseBody annotation along
 * with @Controller annotation, it will return the data directly in a serialized 
 * format. Starting from Spring 4 and above, we can use @RestController annotation which 
 * is equivalent to using @Controller and @ResposeBody annotation
 */
@RestController
//@CrossOrigin
@RequestMapping("/reminderservice")   //Added By Rabi
@CrossOrigin("http://localhost:4200") //Added By Rabi
public class ReminderController {

	/*
	 * From the problem statement, we can understand that the application requires
	 * us to implement five functionalities regarding reminder. They are as
	 * following:
	 * 
	 * 1. Create a reminder 2. Delete a reminder 3. Update a reminder 2. Get all
	 * reminders by userId 3. Get a specific reminder by id.
	 * 
	 * we must also ensure that only a user who is logged in should be able to
	 * perform the functionalities mentioned above.
	 * 
	 */

	/*
	 * Autowiring should be implemented for the ReminderService. (Use
	 * Constructor-based autowiring) Please note that we should not create any
	 * object using the new keyword
	 */
	@Autowired ReminderService reminderService;
	
	@PostMapping("/api/v1/reminder")
	public ResponseEntity<HttpStatus> createReminder(@RequestBody Reminder reminder, HttpSession session){
		
			try {
				reminderService.createReminder(reminder);
				return new ResponseEntity<HttpStatus>(HttpStatus.CREATED);
				 
			} catch (ReminderNotCreatedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return new ResponseEntity<HttpStatus>(HttpStatus.CONFLICT);
			}
		
	}
	
	@PutMapping("/api/v1/reminder/{id}")
	public ResponseEntity<HttpStatus> updateReminder( @RequestBody Reminder reminder,
			HttpSession session) {
		    Reminder fetchReminder = null;
			try {
				fetchReminder = reminderService.updateReminder(reminder, reminder.getReminderId());
			} catch (ReminderNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				
			}
			    if(fetchReminder == null){
			    	return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
			    }
				return new ResponseEntity<HttpStatus>(HttpStatus.OK);
			
		

	}
	@DeleteMapping("/api/v1/reminder/{userId}/{reminderId}")
	public ResponseEntity<HttpStatus> deleteReminder(@PathVariable String userId,@PathVariable Long reminderId) {
			try {
				reminderService.deleteReminder(reminderId);
			} catch (ReminderNotFoundException e) {
				e.getMessage();
				return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
			}
			return null;
	}
	@GetMapping("/api/v1/reminder")
	public List<Reminder> getAllReminderById(@RequestBody List<Reminder> reminder,
			HttpSession session) {
	
				return reminderService.getAllReminders();
			    
	}
	@GetMapping("/api/v1/reminder/{userId}/{reminderId}")
	public ResponseEntity<HttpStatus> getReminderById(@PathVariable Long reminderId,@PathVariable String userId,
			HttpSession session) {
	
			
			try {
				reminderService.getReminderById(reminderId);
			} catch (ReminderNotFoundException e) {
				// TODO Auto-generated catch block
				
				return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
			}
			return null;
				
				
			
	}
	@GetMapping("/api/v1/reminder/{userId}")
	public Object getAllRemindersByUserId(@PathVariable String userId) {
		return reminderService.getAllReminderByUserId(userId);
	}
	
	
	/*
	 * Define a handler method which will create a reminder by reading the
	 * Serialized reminder object from request body and save the reminder in
	 * reminder table in database. Please note that the reminderId has to be unique
	 * and the loggedIn userID should be taken as the reminderCreatedBy for the
	 * reminder. This handler method should return any one of the status messages
	 * basis on different situations: 1. 201(CREATED - In case of successful
	 * creation of the reminder 2. 409(CONFLICT) - In case of duplicate reminder ID
	 * 3. 401(UNAUTHORIZED) - If the user trying to perform the action has not
	 * logged in.
	 * 
	 * This handler method should map to the URL "/reminder" using HTTP POST
	 * method".
	 */

	/*
	 * Define a handler method which will delete a reminder from a database.
	 * 
	 * This handler method should return any one of the status messages basis on
	 * different situations: 1. 200(OK) - If the reminder deleted successfully from
	 * database. 2. 404(NOT FOUND) - If the reminder with specified reminderId is
	 * not found. 3. 401(UNAUTHORIZED) - If the user trying to perform the action
	 * has not logged in.
	 * 
	 * This handler method should map to the URL "/reminder/{id}" using HTTP Delete
	 * method" where "id" should be replaced by a valid reminderId without {}
	 */

	/*
	 * Define a handler method which will update a specific reminder by reading the
	 * Serialized object from request body and save the updated reminder details in
	 * a reminder table in database handle ReminderNotFoundException as well. please
	 * note that the loggedIn userID should be taken as the reminderCreatedBy for
	 * the reminder. This handler method should return any one of the status
	 * messages basis on different situations: 1. 200(OK) - If the reminder updated
	 * successfully. 2. 404(NOT FOUND) - If the reminder with specified reminderId
	 * is not found. 3. 401(UNAUTHORIZED) - If the user trying to perform the action
	 * has not logged in.
	 * 
	 * This handler method should map to the URL "/reminder/{id}" using HTTP PUT
	 * method.
	 */

	/*
	 * Define a handler method which will get us the reminders by a userId.
	 * 
	 * This handler method should return any one of the status messages basis on
	 * different situations: 1. 200(OK) - If the reminder found successfully. 2.
	 * 401(UNAUTHORIZED) -If the user trying to perform the action has not logged
	 * in.
	 * 
	 * 
	 * This handler method should map to the URL "/reminder" using HTTP GET method
	 */

	/*
	 * Define a handler method which will show details of a specific reminder handle
	 * ReminderNotFoundException as well. This handler method should return any one
	 * of the status messages basis on different situations: 1. 200(OK) - If the
	 * reminder found successfully. 2. 401(UNAUTHORIZED) - If the user trying to
	 * perform the action has not logged in. 3. 404(NOT FOUND) - If the reminder
	 * with specified reminderId is not found. This handler method should map to the
	 * URL "/reminder/{id}" using HTTP GET method where "id" should be replaced by a
	 * valid reminderId without {}
	 */

}