package com.stackroute.keepnote.controller;

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

import com.stackroute.keepnote.exception.NoteNotFoundExeption;
import com.stackroute.keepnote.model.Note;
import com.stackroute.keepnote.service.NoteService;

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
@RequestMapping("/noteservice")   //Added By Rabi
@CrossOrigin("http://localhost:4200") //Added By Rabi
public class NoteController {

	/*
	 * Autowiring should be implemented for the NoteService. (Use
	 * Constructor-based autowiring) Please note that we should not create any
	 * object using the new keyword
	 */
	NoteService noteService;

	public NoteController(@Autowired NoteService noteService) {
		this.noteService = noteService;
	}
	
	@GetMapping("/api/v1/note/{userId}")
	public Object getAllNotesByUserId(@PathVariable String userId) {
		return noteService.getAllNoteByUserId(userId);
	}

	@PostMapping("/api/v1/note")
	public ResponseEntity<HttpStatus> createNote(@RequestBody Note note) {

		if (noteService.createNote(note)) {
			return new ResponseEntity<HttpStatus>(HttpStatus.CREATED);
		} else {
			return new ResponseEntity<HttpStatus>(HttpStatus.CONFLICT);
		}

	}

	@GetMapping("/api/v1/note/{userId}/{noteId}")
	public ResponseEntity<HttpStatus> getNoteById(@PathVariable String userId,@PathVariable Integer noteId) {
		
		
			try{
			noteService.getNoteByNoteId(userId, noteId);
			}catch(NoteNotFoundExeption e){
				return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
			}
			return null;
		

	}
	@DeleteMapping("/api/v1/note/{userId}/{noteId}")
	public ResponseEntity<HttpStatus> deleteNote(@PathVariable String userId,@PathVariable Integer noteId) {
		boolean flag = false;
		

			flag = noteService.deleteNote(userId,noteId);

			if (!flag) {
				return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
			} else {
				return new ResponseEntity<HttpStatus>(HttpStatus.OK);
			}
		

	}
	@DeleteMapping("/api/v1/note/{userId}")
	public ResponseEntity<HttpStatus> deleteAllNote(@PathVariable String userId) {
		

			try {
				 noteService.deleteAllNotes(userId);
			} catch (NoteNotFoundExeption e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
			}

			
				return new ResponseEntity<HttpStatus>(HttpStatus.OK);
			
		

	}

	@PutMapping(path = "/api/v1/note/{userId}/{noteId}", consumes = "application/json")
	public Object updateNote(@RequestBody Note note,@PathVariable String userId,@PathVariable Integer noteId) {
		Note fetchNote = null;
		
			try {
			

					fetchNote = noteService.updateNote(note, noteId, userId);
				
			} catch (NoteNotFoundExeption e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
			}
			return fetchNote;
		

	}
	/*
	 * Define a handler method which will create a specific note by reading the
	 * Serialized object from request body and save the note details in a Note
	 * table in the database.Handle ReminderNotFoundException and
	 * CategoryNotFoundException as well. please note that the loggedIn userID
	 * should be taken as the createdBy for the note.This handler method should
	 * return any one of the status messages basis on different situations: 1.
	 * 201(CREATED) - If the note created successfully. 2. 409(CONFLICT) - If
	 * the noteId conflicts with any existing user3. 401(UNAUTHORIZED) - If the
	 * user trying to perform the action has not logged in.
	 * 
	 * This handler method should map to the URL "/note" using HTTP POST method
	 */

	/*
	 * Define a handler method which will delete a note from a database.
	 * 
	 * This handler method should return any one of the status messages basis on
	 * different situations: 1. 200(OK) - If the note deleted successfully from
	 * database. 2. 404(NOT FOUND) - If the note with specified noteId is not
	 * found. 3. 401(UNAUTHORIZED) - If the user trying to perform the action
	 * has not logged in.
	 * 
	 * This handler method should map to the URL "/note/{id}" using HTTP Delete
	 * method" where "id" should be replaced by a valid noteId without {}
	 */

	/*
	 * Define a handler method which will update a specific note by reading the
	 * Serialized object from request body and save the updated note details in
	 * a note table in database handle ReminderNotFoundException,
	 * NoteNotFoundException, CategoryNotFoundException as well. please note
	 * that the loggedIn userID should be taken as the createdBy for the note.
	 * This handler method should return any one of the status messages basis on
	 * different situations: 1. 200(OK) - If the note updated successfully. 2.
	 * 404(NOT FOUND) - If the note with specified noteId is not found. 3.
	 * 401(UNAUTHORIZED) - If the user trying to perform the action has not
	 * logged in.
	 * 
	 * This handler method should map to the URL "/note/{id}" using HTTP PUT
	 * method.
	 */

	/*
	 * Define a handler method which will get us the notes by a userId.
	 * 
	 * This handler method should return any one of the status messages basis on
	 * different situations: 1. 200(OK) - If the note found successfully. 2.
	 * 401(UNAUTHORIZED) -If the user trying to perform the action has not
	 * logged in.
	 * 
	 * 
	 * This handler method should map to the URL "/note" using HTTP GET method
	 */

}
