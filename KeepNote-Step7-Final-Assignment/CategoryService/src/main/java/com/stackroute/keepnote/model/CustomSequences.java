/*package com.stackroute.keepnote.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
//@Document(collection ="categorySequence")
@Entity(name ="categorySequence") //Added By Rabi
public class CustomSequences {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)//Added by Rabi
	private Long id;
	private int seq;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}
	
	
	
}
*/