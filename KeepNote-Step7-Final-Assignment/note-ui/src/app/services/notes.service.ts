import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Injectable,Output,EventEmitter } from '@angular/core';
import { Note } from '../note';
import 'rxjs/add/observable/throw';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {HttpErrorResponse} from '@angular/common/http'
import { Component, OnInit,Input} from '@angular/core';
@Injectable()
export class NotesService implements OnInit{
  //url = "http://localhost:9300/api/v1/notes";
 //  url = "/noteservice/api/v1/note";
   url = "http://localhost:9300"+"/noteservice/api/v1/note";
 
  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;
  
  constructor(private http:HttpClient) { 
     
   
    

  }
  ngOnInit(){
     this.notesSubject = this.getNotes(localStorage.getItem("userId"));
  }
  private extractData(res: Response) {
    
    let body = res;
    return body;
  }

  fetchNotesFromServer(userId) : Observable<Array<Note>> {
    return this.http.get(`${this.url}/${localStorage.getItem("userId")}`)
    .map(this.extractData)
    .catch(this.handleErrorObservable);
    ;
  }

  getNotes(userId): BehaviorSubject<Array<Note>> {
    this.notesSubject = new BehaviorSubject<Array<Note>>(new Array<Note>());
     this.fetchNotesFromServer(userId).subscribe(
      notes => {this.notes = notes; this.notesSubject.next(this.notes)},
      error =>  this.handleErrorObservable(error));
     return this.notesSubject;
  }

  addNote(note: Note): Observable<Object> {
    //let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let userId=localStorage.getItem("userId");
    //return this.http.post(this.url, note,{observe:'response'});
    return this.http.post(this.url+'/'+userId, note,{observe:'response'});
    
  }

  editNote(note: Note): Observable<Note> {
 let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.url}/${localStorage.getItem("userId")}/${note.noteId}`, note)
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }
  updateAllNotes(categoryId : any, reminderId : any): Observable<Object> {
 let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.url}/${localStorage.getItem("userId")}/${categoryId}/${reminderId}`,null);
  }
 deleteNote(note: Note): Observable<Object> {
 let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(`${this.url}/${localStorage.getItem("userId")}/${note.noteId}`);
    
  }
  getNoteById(noteId:String): Note {
    let returnNote : Note = null;
    this.notesSubject.subscribe((notes)=>{
      this.notes = notes;
      this.notes.forEach(note=>{
        if(note.noteId.toString()===noteId)
        {    
            returnNote = note;
            
        }
    })
    });
    return returnNote;
 
  }
   private handleErrorObservable (error: HttpErrorResponse | any) {
    console.error(error.message || error);
    
    return Observable.throw(new HttpErrorResponse(error));
  }
}
