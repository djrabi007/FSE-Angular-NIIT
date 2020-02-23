package com.stackroute.keepnote.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.keepnote.exception.CategoryDoesNoteExistsException;
import com.stackroute.keepnote.exception.CategoryNotCreatedException;
import com.stackroute.keepnote.exception.CategoryNotFoundException;
import com.stackroute.keepnote.model.Category;
import com.stackroute.keepnote.repository.CategoryRepository;

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
public class CategoryServiceImpl implements CategoryService {

	/*
	 * Autowiring should be implemented for the CategoryRepository. (Use
	 * Constructor-based autowiring) Please note that we should not create any
	 * object using the new keyword.
	 */

	/*
	 * This method should be used to save a new category.Call the corresponding
	 * method of Respository interface.
	 */
	//@Autowired
	//NextSequenceService nextSequenceService;  //Removed By Rabi
	CategoryRepository categoryRepository;
	
	public CategoryServiceImpl(@Autowired CategoryRepository categoryRepository) {
		super();
		this.categoryRepository = categoryRepository;
	}

	public Category createCategory(Category category) throws CategoryNotCreatedException {
      //Removed By Rabi
		//  category.setId(String.valueOf(nextSequenceService.getNextSequence(Category.SEQUENCE_NAME)));
		//Category fetchCategory = categoryRepository.insert(category);
		Category fetchCategory = categoryRepository.save(category); //Added By Rabi
		if(fetchCategory == null){
			throw new CategoryNotCreatedException("");
		}
		return fetchCategory;
	}

	/*
	 * This method should be used to delete an existing category.Call the
	 * corresponding method of Respository interface.
	 */
	public boolean deleteCategory(Long categoryId) throws CategoryDoesNoteExistsException {

		if(categoryRepository.findById(categoryId) == null){
			throw new CategoryDoesNoteExistsException("");
		}
		categoryRepository.deleteById(categoryId);
		return true;
	}

	/*
	 * This method should be used to update a existing category.Call the
	 * corresponding method of Respository interface.
	 */
	public Category updateCategory(Category category, Long categoryId) {

		Category fetchcategory = categoryRepository.findById(categoryId).get();
		fetchcategory = category;
		categoryRepository.save(fetchcategory);
		return fetchcategory;
	}

	/*
	 * This method should be used to get a category by categoryId.Call the
	 * corresponding method of Respository interface.
	 */
	public Category getCategoryById(Long categoryId) throws CategoryNotFoundException {
		Category category = null;
		try{
		category = categoryRepository.findById(categoryId).get();}catch(NoSuchElementException e){
			throw new CategoryNotFoundException("");
		}
		return category;
	}

	/*
	 * This method should be used to get a category by userId.Call the corresponding
	 * method of Respository interface.
	 */
	public List<Category> getAllCategoryByUserId(String userId) {

		return categoryRepository.findAllCategoryByCategoryCreatedBy(userId);
	}

}
