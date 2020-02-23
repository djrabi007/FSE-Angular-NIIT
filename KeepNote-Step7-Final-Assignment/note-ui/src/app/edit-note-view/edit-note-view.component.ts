import { Component, OnInit, Inject, OnDestroy,Input } from '@angular/core';
import { Note } from '../note';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialog } from '@angular/material/dialog';
import { RouterService } from '../services/router.service';
import { NotesService } from '../services/notes.service';
import { CategoryService } from '../services/category.service';
import { ReminderService } from '../services/reminder.service';
import { Category } from '../category';
import { Reminder } from '../reminder';
import {HttpErrorResponse} from '@angular/common/http'
@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit, OnDestroy {
  public note: Note;
  public states : Array<String> = ['not-started','started','completed']
  errMessage: string;
   categories : Category[];
   reminders : Reminder[];
   selectedCategory : Category;
   selectedReminders :Reminder[];
  constructor(private dialogRef: MatDialogRef<EditNoteViewComponent>,public dialog: MatDialog,
    private routeService: RouterService,private categoryService : CategoryService,private reminderService : ReminderService,
    private notesService: NotesService,
    @Inject(MAT_DIALOG_DATA) private data: { note: Note }) { 
    this.dialogRef.disableClose = true;

}

  ngOnInit() {
   
   this.note = this.data.note;
     
   // this.note = this.notesService.getNoteById(this.route.snapshot.params.noteId);
   this.categories = this.categoryService.categories;
	
	
   this.reminders = this.reminderService.reminders;
   
   this.categories.forEach(category=>{if(category.categoryId===this.note.category.categoryId){
	   this.selectedCategory = category;
   }});
  
  }


  validateNote(): boolean {
   if (this.note.noteTitle === undefined || this.note.noteContent === '' || 
       !this.note.noteTitle.trim() ||this.note.noteContent === undefined ||
       this.note.noteContent === '' || !this.note.noteContent.trim()
       ) {
         // add the error message when any field is empty
     this.errMessage = 'Title and Text both are required fields';
     return false;
   }
   return true;
 }
  ngOnDestroy() {
   
    
    
     
  }
  
  compareReminder(r1: Reminder, r2: Reminder): boolean {
	  console.log(r1.reminderId +'-' + r2.reminderId);
          return r1 && r2 ? r1.reminderId === r2.reminderId : r1=== r2;
        }	
		
		
 handleErrorResponse(error: HttpErrorResponse): void {
   // error to display when it is failure

   if (error.status === 404) {
     this.errMessage = `Http failure response for ${error.url}: 404 Not Found`;
   } else {
     this.errMessage = 'An error occurred:' + error;
   }
 }
  onSave() {
    if(this.validateNote()){
	  this.note.category = this.selectedCategory;
    this.notesService.editNote(this.note).subscribe((editedNote) => {
      this.dialogRef.close();
      this.routeService.routeBack();
      this.routeService.routeToNoteCardView();
    },
      (err: any) => {
      this.errMessage = err.message;
    });
    

    
  
 }
 }
}
