import { Component, OnInit, Inject, OnDestroy,Input } from '@angular/core';
import { Category } from '../category';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialog } from '@angular/material/dialog';
import { RouterService } from '../services/router.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-edit-category-view',
  templateUrl: './edit-category-view.component.html',
  styleUrls: ['./edit-category-view.component.css']
})
export class EditCategoryViewComponent implements OnInit, OnDestroy {
  public category: Category;
  
  errMessage: string;
  
  constructor(private dialogRef: MatDialogRef<EditCategoryViewComponent>,public dialog: MatDialog,
    private routeService: RouterService,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) private data: { category: Category }) { 
    this.dialogRef.disableClose = true;

}

  ngOnInit() {
   
   this.category = this.data.category;
   // this.note = this.notesService.getNoteById(this.route.snapshot.params.noteId);
   
  }

  ngOnDestroy() {
   
    
    
     
  }
  validateCategory(): boolean {
   if (this.category.categoryName === undefined  ||
       !this.category.categoryName.trim() ||
       this.category.categoryName === '' 
       ) {
         // add the error message when any field is empty
     this.errMessage = 'Name is required field';
     return false;
   }
   return true;
 }

  onSave() {
    if(this.validateCategory()){
    this.categoryService.editCategory(this.category).subscribe((editedCategory) => {
      this.dialogRef.close();
      this.routeService.routeBack();
    },
      (err: any) => {
      this.errMessage = err.message;
    });
     
 }
    
  }
}
