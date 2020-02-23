import {Component, Inject,Input} from '@angular/core';
import {Note} from '../note';
import {EditNoteOpenerComponent} from '../edit-note-opener/edit-note-opener.component';
import {RouterService} from '../services/router.service';
import {NotesService} from '../services/notes.service';
import {HttpErrorResponse} from '@angular/common/http'
import {MatSnackBar} from '@angular/material';
/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-note',
  templateUrl: 'note.component.html',
  styleUrls: ['note.component.css'],
})
export class NoteComponent {

  @Input('note') note: Note;
   
  errMessage : any;
  deletedNote : Note;
  constructor(private routerService : RouterService,private noteService:NotesService,private snackBar: MatSnackBar) {}

  click() : void {
  	
  	this.routerService.routeToEditNoteView(this.note.noteId);
  }
  delete():void{
  	this.noteService.deleteNote(this.note).subscribe(response=>{

      this.deletedNote = this.noteService.notes.find(note=>note.noteId===this.note.noteId);
      this.noteService.notes.splice(this.noteService.notes.indexOf(this.deletedNote),1);
      this.openSnackBar('Note '+this.deletedNote.noteTitle+' deleted','Success');
    },
   error=>this.handleErrorResponse(error))
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

