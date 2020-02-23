import { Component,Input,OnInit } from '@angular/core';
import {Category} from '../category';
import {HttpErrorResponse} from '@angular/common/http'
import { CategoryService } from '../services/category.service';
@Component({
  selector: 'app-category-card-view',
  templateUrl: './category-card-view.component.html',
  styleUrls: ['./category-card-view.component.css']
})
export class CategoryCardViewComponent implements OnInit{

 categories : Category[];
 errorMessage: String;
  constructor(private categoryService: CategoryService) { 


  }
 errMessage: String;
  ngOnInit(): void {
   
    this.categoryService.getCategories(localStorage.getItem("userId")).subscribe(

    categories=> this.categories=categories,

    error => this.handleErrorResponse(error));
    
   
    
  }



handleErrorResponse(error: HttpErrorResponse): void {
   // error to display when it is failure

   if (error.status === 404) {
     this.errorMessage = `Http failure response for ${error.url}: 404 Not Found`;
   } else {
     this.errorMessage = 'An error occurred:' + error.error.message;
   }
 }
  
}
