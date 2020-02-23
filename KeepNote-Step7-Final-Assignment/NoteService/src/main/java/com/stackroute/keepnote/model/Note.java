package com.stackroute.keepnote.model;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;
//@Document
@Entity
public class Note {
	
	/*
	 * This class should have eight fields
	 * (noteId,noteTitle,noteContent,noteStatus,createdAt,
	 * category,reminder,createdBy). This class should also contain the
	 * getters and setters for the fields along with the no-arg , parameterized
	 * constructor and toString method. The value of createdAt should not be
	 * accepted from the user but should be always initialized with the system date.
	 * 
	 */

	@Id
	private int id;
	
	@Transient
	public static final String SEQUENCE_NAME="noteSequence";

	public Note() {
		super();
	}

	public Note(int noteId, String noteTitle, String noteContent, String noteStatus, String createdBy, Date createdAt,
			List<Reminder> reminder, Category category) {
		super();
		this.id = noteId;
		this.noteTitle = noteTitle;
		this.noteContent = noteContent;
		this.noteStatus = noteStatus;
		this.noteCreatedBy = createdBy;
		this.noteCreationDate = createdAt;
		this.reminder = reminder;
		this.category = category;
	}

	private String noteTitle;

	private String noteContent;

	private String noteStatus;

	private String noteCreatedBy;
	
	@JsonIgnore
	private Date noteCreationDate;
	
    private List<Reminder> reminder;
	
    private Category category;
	    // getters & setters

	public int getNoteId() {
		return id;
	}

	public void setNoteId(int noteId) {
		this.id = noteId;
	}

	public String getNoteTitle() {
		return noteTitle;
	}

	public void setNoteTitle(String noteTitle) {
		this.noteTitle = noteTitle;
	}

	public String getNoteContent() {
		return noteContent;
	}

	public void setNoteContent(String noteContent) {
		this.noteContent = noteContent;
	}

	public String getNoteStatus() {
		return noteStatus;
	}

	public void setNoteStatus(String noteStatus) {
		this.noteStatus = noteStatus;
	}

	public String getCreatedBy() {
		return noteCreatedBy;
	}

	public void setNoteCreatedBy(String createdBy) {
		this.noteCreatedBy = createdBy;
	}

	
	public Date getNoteCreationDate() {
		return noteCreationDate;
	}

	public void setNoteCreationDate(Date noteCreationDate) {
		this.noteCreationDate = noteCreationDate;
	}

	public String getNoteCreatedBy() {
		return noteCreatedBy;
	}

	public List<Reminder> getReminder() {
		return reminder;
	}

	public void setReminders(List<Reminder> reminder) {
		this.reminder = reminder;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	@Override
	public String toString() {
		return "Note [noteId=" + id + ", noteTitle=" + noteTitle + ", noteContent=" + noteContent + ", noteStatus="
				+ noteStatus + ", createdBy=" + noteCreatedBy + ", createdAt=" + noteCreationDate + ", reminder=" + reminder
				+ ", category=" + category + "]";
	}

}
