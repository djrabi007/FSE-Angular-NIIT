import { Component ,AfterViewInit,Input} from '@angular/core';
import { NotesService } from '../services/notes.service';
import { Note } from '../note';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
notes : Observable<Note[]>;
 

  constructor(private noteService: NotesService) {

  		//this.notes=	this.noteService.fetchNotesFromServer(localStorage.getItem("userId"));

  }

}
