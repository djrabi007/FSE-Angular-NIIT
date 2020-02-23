import { Component,Inject,ViewChild,TemplateRef } from '@angular/core';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef} from '@angular/material';
import {Category} from '../category';
import { ActivatedRoute, Params } from '@angular/router';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { CategoryService } from '../services/category.service';
import {EditCategoryViewComponent} from '../edit-category-view/edit-category-view.component';
import { RouterService } from '../services/router.service';
@Component({
  selector: 'app-edit-category-opener',
  templateUrl: './edit-category-opener.component.html',
  styleUrls: ['./edit-category-opener.component.css']
})
export class EditCategoryOpenerComponent {
 
 categoryId : String
 category : Category;
 dialogRef : MatDialogRef<EditCategoryViewComponent>
// @ViewChild('editNoteViewComponent')
 // dialogComponent: TemplateRef<any>;

  
constructor(private route: ActivatedRoute,private router: Router,
    private dialog:MatDialog,
    private categoryService: CategoryService,private routeService: RouterService,) {
 this.category = this.categoryService.getCategoryById( this.route.snapshot.params.categoryId);

this.openDialog(this.category);

router.events.subscribe( (event: Event) => {

          
            if (event instanceof NavigationStart) {
              
               console.log('navigation starts');
               
                 
                 
                
            }

            if (event instanceof NavigationEnd) {
                  console.log('navigation ends');
                  
                 

                  //this.openDialog(this.note);
            }

            if (event instanceof NavigationError) {
               
                console.log(event.error);
            }
           
 });


    
  }
  openDialog(category: Category) {
    this.dialogRef = this.dialog.open(EditCategoryViewComponent,{width: '250px',disableClose: true,data : { category:category}});
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.routeService.routeBack();
    });
  }
   
}


    

