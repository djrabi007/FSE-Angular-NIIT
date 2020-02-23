package com.stackroute.keepnote.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.keepnote.exception.ReminderNotCreatedException;
import com.stackroute.keepnote.exception.ReminderNotFoundException;
import com.stackroute.keepnote.model.Reminder;
import com.stackroute.keepnote.repository.ReminderRepository;

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
public class ReminderServiceImpl implements ReminderService {

	/*
	 * Autowiring should be implemented for the ReminderRepository. (Use
	 * Constructor-based autowiring) Please note that we should not create any
	 * object using the new keyword.
	 */

	/*
	 * This method should be used to save a new reminder.Call the corresponding
	 * method of Respository interface.
	 */
	@Autowired
	ReminderRepository reminderRepository;
	//@Autowired
	//NextSequenceService nextSequenceService;
	public Reminder createReminder(Reminder reminder) throws ReminderNotCreatedException {
		//reminder.setReminderId(String.valueOf(nextSequenceService.getNextSequence(Reminder.SEQUENCE_NAME)));
		//Reminder fetchReminder = reminderRepository.insert(reminder);
		Reminder fetchReminder = reminderRepository.save(reminder);//Added By Rabi
		if(fetchReminder == null){
			throw new ReminderNotCreatedException("");
		}
		return fetchReminder;
	}

	/*
	 * This method should be used to delete an existing reminder.Call the
	 * corresponding method of Respository interface.
	 */
	public boolean deleteReminder(Long reminderId) throws ReminderNotFoundException {
		
		if(reminderRepository.findById(reminderId) == null){
			throw new ReminderNotFoundException("");
		}
		reminderRepository.deleteById(reminderId);
		return true;
	}

	/*
	 * This method should be used to update a existing reminder.Call the
	 * corresponding method of Respository interface.
	 */
	public Reminder updateReminder(Reminder reminder, Long reminderId) throws ReminderNotFoundException {

		Reminder fetchReminder = reminderRepository.findById(reminderId).get();
		fetchReminder = reminder;
		reminderRepository.save(fetchReminder);
		return fetchReminder;
	}

	/*
	 * This method should be used to get a reminder by reminderId.Call the
	 * corresponding method of Respository interface.
	 */
	public Reminder getReminderById(Long reminderId) throws ReminderNotFoundException {

		return reminderRepository.findById(reminderId).get();
	}

	/*
	 * This method should be used to get all reminders. Call the corresponding
	 * method of Respository interface.
	 */

	public List<Reminder> getAllReminders() {

		return reminderRepository.findAll();
	}
	public List<Reminder> getAllReminderByUserId(String userId) {

		return reminderRepository.findAllReminderByReminderCreatedBy(userId);
	}

}
