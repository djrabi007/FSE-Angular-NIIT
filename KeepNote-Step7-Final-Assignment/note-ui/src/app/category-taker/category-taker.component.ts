import { Component, OnInit,Output,ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import {NgModule} from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatCardModule,MatToolbarModule} from '@angular/material';
import {FormsModule,NgModel} from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { RouterService } from '../services/router.service';
import { Category } from '../category';
import {FormGroup,FormControl,Validators,FormArray} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http'

@Component({
  selector: 'app-category-taker',
  templateUrl: './category-taker.component.html',
  styleUrls: ['./category-taker.component.css']
})
export class CategoryTakerComponent {
 @ViewChild('nameModel') nameModel : NgModel;
  title = 'A note taking app';
  observableCategories: Observable<Category[]>
  
  errMessage: String;
  errorMessage : String;
  id: String;
  categoryName: string;
  categoryDescription: string;
  
  category = new Category();
  constructor(private categoryService: CategoryService,private routerService:RouterService) { 

     
  }

  
  addCategories():void{
     this.errMessage = '';

   
    if(this.validateCategory()){
     this.category.categoryCreatedBy = localStorage.getItem("userId");
      this.category.categoryName= this.categoryName;   
      this.category.categoryDescription= this.categoryDescription;   
     
      
     this.categoryService.addCategory(this.category).subscribe( response=> {
      
     
      
     // this.noteTemp.noteTitle = this.note.noteTitle;
     let maxId =0;
      if(this.categoryService.categories == null)
      {
        this.categoryService.categories = new Array<Category>();
      }else{
        this.categoryService.categories.forEach(category=>{
         if(category.categoryId > maxId){
           maxId=category.categoryId;
         }
        });
      }
      this.category.categoryId = ++maxId;
      this.categoryService.categories.unshift(this.category);
      this.categoryService.categorySubject.next(this.categoryService.categories);
      
       this.reset(); 
       this.routerService.routeToCategoryCardView();
    },
    //error => this.errorMessage = <any>error);
    error=>this.handleErrorResponse(error));
   }else{
    
    }
  }
  validateCategory(): boolean {
   if (this.categoryName === undefined  ||
       !this.categoryName.trim() ||
       this.categoryName === '' 
       ) {
         // add the error message when any field is empty
     this.errMessage = 'Name is required field';
     return false;
   }
   return true;
 }
 handleErrorResponse(error: HttpErrorResponse): void {
   // error to display when it is failure

   if (error.status === 404) {
     this.errMessage = `Http failure response for ${error.url}: 404 Not Found`;
   } else {
     this.errMessage = 'An error occurred:' + error.error.message;
   }
 }
  private reset() {
    
    this.errMessage = null;
    this.errorMessage = null;
    
    this.nameModel.control.reset();
    this.nameModel.control.setErrors(null);
    
    this.categoryDescription= '';
  }
}
