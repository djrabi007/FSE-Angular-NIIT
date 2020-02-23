package com.stackroute.keepnote.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.keepnote.model.Reminder;

/*
* This class is implementing the MongoRepository interface for User.
* Annotate this class with @Repository annotation
* */
@Repository
//public interface ReminderRepository extends MongoRepository<Reminder, String> {
public interface ReminderRepository extends JpaRepository<Reminder, Long> {	
	List<Reminder> findAllReminderByReminderCreatedBy(String createdBy);
}
