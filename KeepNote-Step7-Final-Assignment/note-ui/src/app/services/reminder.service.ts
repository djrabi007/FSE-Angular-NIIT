import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Injectable,Output,EventEmitter } from '@angular/core';
import { Reminder } from '../reminder';
import 'rxjs/add/observable/throw';
import {HttpClient} from '@angular/common/http';
import {Response,RequestOptions} from '@angular/http';
import {HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {HttpErrorResponse} from '@angular/common/http'
import { Component, OnInit,Input} from '@angular/core';
@Injectable()
export class ReminderService implements OnInit{
  //url = "http://localhost:9500/api/v1/reminder"
 // url = "/reminderservice/api/v1/reminder";
  url = "http://localhost:9500/reminderservice/api/v1/reminder"
 // url = "http://localhost:9300/reminderservice/api/v1/reminder"
  
  reminders: Array<Reminder>;
  reminderSubject: BehaviorSubject<Array<Reminder>>;
  
  constructor(private http:HttpClient) { 
     
   
    

  }

 ngOnInit(){
     this.reminderSubject = this.getReminders(localStorage.getItem("userId"));
  }
private extractData(res: Response) {
    
    let body = res;
    return body;
  }

  fetchRemindersFromServer(userId) : Observable<Array<Reminder>> {
    return this.http.get(`${this.url}/${userId}`)
    .map(this.extractData)
    .catch(this.handleErrorObservable);
    ;
  }

  getReminders(userId): BehaviorSubject<Array<Reminder>> {
    this.reminderSubject = new BehaviorSubject<Array<Reminder>>(new Array<Reminder>());
     this.fetchRemindersFromServer(userId).subscribe(
      reminders => {this.reminders = reminders; this.reminderSubject.next(this.reminders)},
      error =>  this.handleErrorObservable(error));
     return this.reminderSubject;
  }

  addReminder(reminder: Reminder): Observable<Object> {
    //let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
   // return this.http.post(this.url, reminder,{observe:'response'});
   //let userId='${localStorage.getItem("userId")}'
   let userId=localStorage.getItem("userId");
   return this.http.post(this.url+'/'+userId, reminder,{observe:'response'});
    
    
  }

  editReminder(reminder: Reminder): Observable<Reminder> {
 let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.url}/${reminder.reminderId}`, reminder)
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }
 deleteReminder(reminder: Reminder): Observable<Object> {
 
    return this.http.delete(`${this.url}/${localStorage.getItem("userId")}/${reminder.reminderId}`);
    
  }
  getReminderById(reminderId:String): Reminder {
    let returnReminder : Reminder = null;
    this.reminderSubject.subscribe((reminders)=>{
      this.reminders = reminders;
      this.reminders.forEach(reminder=>{
        if(reminder.reminderId.toString()===reminderId)
        {    
            returnReminder = reminder;
            
        }
    })
    });
    return returnReminder;
 
  }
   private handleErrorObservable (error: HttpErrorResponse | any) {
    console.error(error.message || error);
    
    return Observable.throw(new HttpErrorResponse(error));
  }

 }