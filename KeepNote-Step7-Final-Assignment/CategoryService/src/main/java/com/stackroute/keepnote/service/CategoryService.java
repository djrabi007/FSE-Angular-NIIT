package com.stackroute.keepnote.service;

import com.stackroute.keepnote.exception.CategoryDoesNoteExistsException;
import com.stackroute.keepnote.exception.CategoryNotCreatedException;
import com.stackroute.keepnote.exception.CategoryNotFoundException;
import com.stackroute.keepnote.model.Category;
import java.util.List;

public interface CategoryService {
	
	/*
	 * Should not modify this interface. You have to implement these methods in
	 * corresponding Impl classes
	 */

    Category createCategory(Category category) throws CategoryNotCreatedException;

    boolean deleteCategory(Long categoryId) throws CategoryDoesNoteExistsException;

    Category updateCategory(Category category, Long categoryId);//Modified by Rabi

    Category getCategoryById(Long categoryId) throws CategoryNotFoundException;

    List<Category> getAllCategoryByUserId(String userId);

}
