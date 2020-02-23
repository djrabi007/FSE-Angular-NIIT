package com.stackroute.keepnote.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.keepnote.model.NoteUser;

/*
* This class is implementing the MongoRepository interface for Note.
* Annotate this class with @Repository annotation
* */
@Repository
//public interface NoteRepository extends MongoRepository<NoteUser, String> {
public interface NoteRepository extends JpaRepository<NoteUser, String> {
	//@Query("{'notes.noteCreatedBy':?0}")
	List<NoteUser>findAllByUserId(String userId);

}
