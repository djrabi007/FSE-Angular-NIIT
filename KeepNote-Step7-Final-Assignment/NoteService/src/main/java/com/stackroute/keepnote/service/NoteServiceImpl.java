package com.stackroute.keepnote.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.keepnote.exception.NoteNotFoundExeption;
import com.stackroute.keepnote.model.Note;
import com.stackroute.keepnote.model.NoteUser;
import com.stackroute.keepnote.repository.NoteRepository;

/*
* Service classes are used here to implement additional business logic/validation 
* This class has to be annotated with @Service annotation.
* @Service - It is a specialization of the component annotation. It doesn't currently 
* provide any additional behavior over the @Component annotation, but it's a good idea 
* to use @Service over @Component in service-layer classes because it specifies intent 
* better. Additionally, tool support and additional behavior might rely on it in the 
* future.
* */
@Service
public class NoteServiceImpl implements NoteService {

	/*
	 * Autowiring should be implemented for the NoteRepository and MongoOperation.
	 * (Use Constructor-based autowiring) Please note that we should not create any
	 * object using the new keyword.
	 */

	/*
	 * This method should be used to save a new note.
	 */
	@Autowired
	NoteRepository noteRepository;
	@Autowired
	NextSequenceService nextSequenceService;

	public boolean createNote(Note note) {
		
		NoteUser noteUser = new NoteUser();
		note.setNoteId(nextSequenceService.getNextSequence(Note.SEQUENCE_NAME));
		List<Note> noteList = new ArrayList<>();

		noteList.add(note);
		noteUser.setNotes(noteList);
		noteUser.setUserId(note.getCreatedBy());
		NoteUser fetchNoteUser = null;
		NoteUser noteUserInDb = null;
		try {
			noteUserInDb = noteRepository.findById(note.getCreatedBy()).get();
		} catch (Exception e) {
			e.printStackTrace();
		}
		boolean isConflict = false;
		Note updatedNote = null;
		if (noteUserInDb != null) {
			try {
				List<Note> existingNotes = noteUserInDb.getNotes();
				for (Note noteItr : existingNotes) {
					if (noteItr.getNoteTitle().equals(note.getNoteTitle())
							&& noteItr.getNoteContent().equals(note.getNoteContent())) {
						isConflict = true;
						break;
					}
				}
				if (!isConflict) {
					updatedNote = this.updateNote(note, note.getNoteId(), note.getCreatedBy());
				}

			} catch (NoteNotFoundExeption e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else {
			
			//fetchNoteUser = noteRepository.insert(noteUser);
			fetchNoteUser = noteRepository.save(noteUser);//Rabi
			if (fetchNoteUser == null) {
				try {
					isConflict = true;
					throw new NoteNotFoundExeption("");
					
				} catch (NoteNotFoundExeption e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}

		return !isConflict;
	}

	/* This method should be used to delete an existing note. */

	public boolean deleteNote(String userId, int noteId) {
		Optional<NoteUser> noteUserOptional = noteRepository.findById(userId);
		NoteUser noteUser = noteUserOptional.get();
		List<Note> noteList = noteUser.getNotes();
		List<Note> deleteNoteList = noteList.stream().filter(note -> note.getNoteId() == noteId)
				.collect(Collectors.toList());
		noteList.removeAll(deleteNoteList);
		NoteUser deleteNoteUser = noteRepository.save(noteUser);
		return deleteNoteUser != null;
	}

	/* This method should be used to delete all notes with specific userId. */

	public boolean deleteAllNotes(String userId) {
		Optional<NoteUser> noteUserOptional = noteRepository.findById(userId);
		NoteUser noteUser = noteUserOptional.get();
		List<Note> noteList = noteUser.getNotes();
		List<Note> deleteNoteList = noteList.stream().filter(note -> note.getCreatedBy().equals(userId))
				.collect(Collectors.toList());
		noteList.removeAll(deleteNoteList);
		NoteUser deleteNoteUser = noteRepository.save(noteUser);
		return deleteNoteUser != null;
	}

	/*
	 * This method should be used to update a existing note.
	 */
	public Note updateNote(Note note, int id, String userId) throws NoteNotFoundExeption {
		Optional<NoteUser> noteUserOptional = null;
		try {
			noteUserOptional = noteRepository.findById(userId);
		} catch (NoSuchElementException e) {
			throw new NoteNotFoundExeption("");
		}
		NoteUser noteUser = noteUserOptional.get();
		List<Note> noteList = noteUser.getNotes();
		Note updateNote = noteList.stream().filter(note1 -> note1.getNoteId() == id).findAny().orElse(null);
		noteList.remove(updateNote);
		noteList.add(note);
		noteRepository.save(noteUser);
		return updateNote;
	}

	/*
	 * This method should be used to get a note by noteId created by specific user
	 */
	public Note getNoteByNoteId(String userId, int noteId) throws NoteNotFoundExeption {
		Optional<NoteUser> noteUserOptional = null;
		try {
			noteUserOptional = noteRepository.findById(userId);
		} catch (NoSuchElementException e) {
			throw new NoteNotFoundExeption("");
		}
		return noteUserOptional.get().getNotes().stream().filter(note1 -> note1.getNoteId() == noteId).findAny()
				.orElse(null);
	}

	/*
	 * This method should be used to get all notes with specific userId.
	 */
	public List<Note> getAllNoteByUserId(String userId) {
		NoteUser noteUser = null;
		try {
			noteUser = noteRepository.findById(userId).get();
		} catch (NoSuchElementException e) {
			try {
				throw new NoteNotFoundExeption("");
			} catch (NoteNotFoundExeption e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		}
		return (noteUser != null) ? noteUser.getNotes() : null;
	}

}
