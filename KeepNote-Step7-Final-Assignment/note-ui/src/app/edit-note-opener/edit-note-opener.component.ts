import { Component,Inject,ViewChild,TemplateRef } from '@angular/core';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef} from '@angular/material';
import {Note} from '../note';
import { ActivatedRoute, Params } from '@angular/router';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { NotesService } from '../services/notes.service';
import {EditNoteViewComponent} from '../edit-note-view/edit-note-view.component';
import { RouterService } from '../services/router.service';
@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})
export class EditNoteOpenerComponent {
 
 noteId : String
 note : Note;
 dialogRef : MatDialogRef<EditNoteViewComponent>
// @ViewChild('editNoteViewComponent')
 // dialogComponent: TemplateRef<any>;

  
constructor(private route: ActivatedRoute,private router: Router,
    private dialog:MatDialog,
    private notesService: NotesService,private routeService: RouterService,) {
 this.note = this.notesService.getNoteById( this.route.snapshot.params.noteId);

this.openDialog(this.note);

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
  openDialog(note: Note) {
    this.dialogRef = this.dialog.open(EditNoteViewComponent,{width: '250px',disableClose: true,data : { note:note}});
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.routeService.routeBack();
    });
  }
   
}


    

