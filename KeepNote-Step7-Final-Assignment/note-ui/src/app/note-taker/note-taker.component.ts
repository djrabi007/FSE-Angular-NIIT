import { Component, OnInit,Output,ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import {NgModule} from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatCardModule,MatToolbarModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import { NotesService } from '../services/notes.service';
import { Note } from '../note';
import {FormGroup,FormControl,Validators,FormArray,NgModel} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http'
import { RouterService } from '../services/router.service';
import { CategoryService } from '../services/category.service';
import { ReminderService } from '../services/reminder.service';
import { Category } from '../category';
import { Reminder } from '../reminder';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit{

  @ViewChild('titleModel') titleModel : NgModel;
  @ViewChild('textModel') textModel : NgModel;
  @ViewChild('categoryModel') categoryModel : NgModel;
   @ViewChild('reminderModel') reminderModel : NgModel;
  title = 'A note taking app';
  observableNotes: Observable<Note[]>
  
  errMessage: String;
  errorMessage : String;
  id: String;
  noteTitle: string;
  noteContent: string;
  note = new Note();
  editCategory : Category;
  categories : Category[];
  editReminder : any;
  reminders : Reminder[];
  //noteTemp = new Note();
  constructor(private noteService: NotesService,private routeService: RouterService,private categoryService : CategoryService,private reminderService : ReminderService) { 

     
  }
ngOnInit() {
   
   this.categoryService.getCategories(localStorage.getItem("userId")).subscribe(

    categories=> this.categories=categories,

    error => this.handleErrorResponse(error));
   this.reminderService.getReminders(localStorage.getItem("userId")).subscribe(

    reminders=> this.reminders=reminders,

    error => this.handleErrorResponse(error));
   
  }
  
  addNotes():void{
     this.errMessage = '';

   
    if(this.validateNote()){
     this.note.noteCreatedBy = localStorage.getItem("userId");
      this.note.noteTitle= this.noteTitle;   
      this.note.noteContent= this.noteContent;
      
      this.note.category = this.editCategory;
      
      this.note.reminder = this.editReminder;
     this.noteService.addNote(this.note).subscribe( response=> {
      
     
      
     // this.noteTemp.noteTitle = this.note.noteTitle;
     let maxId =0;
      if(this.noteService.notes == null)
      {
        this.noteService.notes = new Array<Note>();
      }else{
        this.noteService.notes.forEach(note=>{
         if(note.noteId > maxId){
           maxId=note.noteId;
         }
        });
      }
      this.note.noteId = ++maxId;
      this.noteService.notes.unshift(this.note);
      this.noteService.notesSubject.next(this.noteService.notes);
      
       this.reset(); 
       this.routeService.routeToNoteCardView();
    },
    //error => this.errorMessage = <any>error);
    error=>this.handleErrorResponse(error));
   }else{
    
    }
  }
  validateNote(): boolean {
   if (this.noteTitle === undefined || this.noteContent === '' ||
       !this.noteTitle.trim() ||this.noteContent === undefined ||
       this.noteContent === '' || !this.noteContent.trim()
       ) {
         // add the error message when any field is empty
     this.errMessage = 'Title and Text both are required fields';
     return false;
   }
   return true;
 }
 handleErrorResponse(error: HttpErrorResponse): void {
   // error to display when it is failure

   if (error.status === 404) {
     this.errMessage = `Http failure response for ${error.url}: 404 Not Found`;
   } else {
     this.errMessage = 'An error occurred:' + error;
   }
 }
  private reset() {
   this.titleModel.control.reset();
   this.titleModel.control.setErrors(null);
   
   this.textModel.control.reset();
   this.textModel.control.setErrors(null);

   this.categoryModel.control.reset();
   this.categoryModel.control.setErrors(null);

   this.reminderModel.control.reset();
   this.reminderModel.control.setErrors(null);

   this.errorMessage = null;
  
  }
}
