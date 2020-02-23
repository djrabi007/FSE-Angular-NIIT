import { Component, OnInit,Input} from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import {HttpErrorResponse} from '@angular/common/http'
import {map} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {PlatformLocation} from '@angular/common';
@Component({
  selector: 'app-note-list-view',
  templateUrl: './note-list-view.component.html',
  styleUrls: ['./note-list-view.component.css']

})
export class NoteListViewComponent implements OnInit{
  notes : Note[];
  notStartedNotes: Array<Note>;
  startedNotes: Array<Note>;
  completedNotes: Array<Note>;
  errorMessage: String;

  constructor(private noteService: NotesService,private location : PlatformLocation) { 

    
  }
  
  ngOnInit(){

    this.noteService.getNotes(localStorage.getItem("userId")).subscribe(

    notes=> {this.notes=notes; this.populateNotes(notes);},

    error => this.handleErrorResponse(error));
     
  }

  populateNotes( notes : Note[]){
    this.notStartedNotes = new Array<Note>();
    this.startedNotes = new Array<Note>();
    this.completedNotes = new Array<Note>();
    this.loadNotStartedNotes(notes);
    this.loadStartedNotes(notes);
    this.loadCompletedNotes(notes);
  }
  loadNotStartedNotes(notes : Note[]){
    if(notes != null){
      this.notStartedNotes=this.notes.filter(note=>note.noteStatus==='not-started');
    }
    
       
  	
}
 loadStartedNotes(notes : Note[]){
    if(notes != null){
    this.startedNotes=this.notes.filter(note=>note.noteStatus==='started');
   } 
      
    
}
loadCompletedNotes(notes : Note[]){
    if(notes != null){
    this.completedNotes=this.notes.filter(note=>note.noteStatus==='completed');
   }
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
