import {Component, Inject,Input} from '@angular/core';
import {Category} from '../category';
import {EditCategoryOpenerComponent} from '../edit-category-opener/edit-category-opener.component';
import {RouterService} from '../services/router.service';
import {CategoryService} from '../services/category.service';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-category',
  templateUrl: 'category.component.html',
  styleUrls: ['category.component.css'],
})
export class CategoryComponent {

  @Input('category') category: Category;
   errMessage : any;
   deletedCategory : Category;


  constructor(private routerService : RouterService,private categoryService:CategoryService,private snackBar : MatSnackBar) {}

  click() : void {
  	
  	this.routerService.routeToEditCategoryView(this.category.categoryId);
  }
 delete():void{
    this.categoryService.deleteCategory(this.category).subscribe(response=>{

      this.deletedCategory = this.categoryService.categories.find(category=>category.categoryId==this.category.categoryId);
      this.categoryService.categories.splice(this.categoryService.categories.indexOf(this.deletedCategory),1);
      this.openSnackBar('Category '+this.deletedCategory.categoryName+' deleted','Success');
    },
   error=>this.handleErrorResponse(error));

   
  }
handleErrorResponse(error: HttpErrorResponse): void {
   // error to display when it is failure

   if (error.status === 404) {
     this.errMessage = `Http failure response for ${error.url}: 404 Not Found`;
   } else {
     this.errMessage = 'An error occurred:' + error;
   }
 }
openSnackBar(message : string , action : string ){
  this.snackBar.open(message,action,{
    duration : 2000
  });
}
}

