import { Component,Input,OnInit } from '@angular/core';
import {Note} from '../note';
import {HttpErrorResponse} from '@angular/common/http'
import { NotesService } from '../services/notes.service';
@Component({
  selector: 'app-note-card-view',
  templateUrl: './note-card-view.component.html',
  styleUrls: ['./note-card-view.component.css']
})
export class NoteCardViewComponent implements OnInit{

 notes : Note[];
 errorMessage: String;
  constructor(private noteService: NotesService) { 


  }
 errMessage: String;
  ngOnInit(): void {
   
    this.noteService.getNotes(localStorage.getItem("userId")).subscribe(

    notes=> this.notes=notes,

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
