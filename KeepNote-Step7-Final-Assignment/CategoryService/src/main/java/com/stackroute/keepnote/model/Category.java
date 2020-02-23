package com.stackroute.keepnote.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
//@Document
@Entity
public class Category implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/*
	 * This class should have five fields
	 * (categoryId,categoryName,categoryDescription,
	 * categoryCreatedBy,categoryCreationDate). This class should also contain the
	 * getters and setters for the fields along with the toString method. The value
	 * of categoryCreationDate should not be accepted from the user but should be
	 * always initialized with the system date.
	 */
	
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)//Added by Rabi
	public Long categoryId;//Added by Rabi
	//public String categoryId;
	public String categoryName;
	public String categoryDescription;
	public String categoryCreatedBy;
	public Date categoryCreationDate;
	//Removed  by Rabi
	//@Transient
	 //public static final String SEQUENCE_NAME="categorySequence";
	public Long getId() {
		return categoryId;
	}
	/*public void setId(Long categoryId) {
		this.categoryId = categoryId;
	}*/
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public String getCategoryDescription() {
		return categoryDescription;
	}
	public void setCategoryDescription(String categoryDescription) {
		this.categoryDescription = categoryDescription;
	}
	public String getCategoryCreatedBy() {
		return categoryCreatedBy;
	}
	public void setCategoryCreatedBy(String categoryCreatedBy) {
		this.categoryCreatedBy = categoryCreatedBy;
	}
	public Date getCategoryCreationDate() {
		return categoryCreationDate;
	}
	public void setCategoryCreationDate(Date categoryCreationDate) {
		this.categoryCreationDate = categoryCreationDate;
	}
	@Override
	public String toString() {
		return "Category [categoryId=" + categoryId + ", categoryName=" + categoryName + ", categoryDescription="
				+ categoryDescription + ", categoryCreatedBy=" + categoryCreatedBy + ", categoryCreationDate="
				+ categoryCreationDate + "]";
	}
	public Category(Long categoryId, String categoryName, String categoryDescription, String categoryCreatedBy,
			Date categoryCreationDate) {
		super();
		this.categoryId = categoryId;
		this.categoryName = categoryName;
		this.categoryDescription = categoryDescription;
		this.categoryCreatedBy = categoryCreatedBy;
		this.categoryCreationDate = categoryCreationDate;
	}
	public Category() {
		super();
	}
	
    
}
