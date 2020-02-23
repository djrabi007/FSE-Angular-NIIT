import { Component, OnInit,Output,ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import {NgModule} from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatCardModule,MatToolbarModule} from '@angular/material';
import {FormsModule,NgModel} from '@angular/forms';
import { ReminderService } from '../services/reminder.service';
import {RouterService} from '../services/router.service';
import { Reminder } from '../reminder';
import {FormGroup,FormControl,Validators,FormArray} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http'

@Component({
  selector: 'app-reminder-taker',
  templateUrl: './reminder-taker.component.html',
  styleUrls: ['./reminder-taker.component.css']
})
export class ReminderTakerComponent {
  @ViewChild('nameModel') nameModel : NgModel;
   @ViewChild('typeModel') typeModel : NgModel;
  title = 'A reminder taking app';
  observableReminders: Observable<Reminder[]>
  
  errMessage: String;
  errorMessage : String;
  id: String;
  reminderName: string;
  reminderDescription: string;
  reminderType: string;
  reminder = new Reminder();
  constructor(private reminderService: ReminderService,private routerService : RouterService) { 

     
  }

  
  addReminders():void{
     this.errMessage = '';

   if(this.validateReminder()){
     this.reminder.reminderCreatedBy = localStorage.getItem("userId");
      this.reminder.reminderName= this.reminderName;  
      this.reminder.reminderDescription= this.reminderDescription;   
      this.reminder.reminderType= this.reminderType;   
     
     this.reminderService.addReminder(this.reminder).subscribe( response=> {
      
     
      
     // this.noteTemp.noteTitle = this.note.noteTitle;
     let maxId =0;
      if(this.reminderService.reminders== null)
      {
        this.reminderService.reminders = new Array<Reminder>();
      }else{
        this.reminderService.reminders.forEach(reminder=>{
         if(reminder.reminderId > maxId){
           maxId=reminder.reminderId;
         }
        });
      }
      this.reminder.reminderId = ++maxId;
      this.reminderService.reminders.unshift(this.reminder);
      this.reminderService.reminderSubject.next(this.reminderService.reminders);
      
       this.reset(); 
       this.routerService.routeToReminderCardView();
    },
    //error => this.errorMessage = <any>error);
    error=>this.handleErrorResponse(error));
   }else{
    
    }
  }
  validateReminder(): boolean {
   if (this.reminderName === undefined || this.reminderType === '' ||
       !this.reminderName.trim() ||this.reminderType === undefined ||
       this.reminderName === '' || !this.reminderType.trim()
       ) {
         // add the error message when any field is empty
     this.errMessage = 'Name and Type both are required fields';
     return false;
   }
   return true;
 }
 handleErrorResponse(error: HttpErrorResponse): void {
   // error to display when it is failure

   if (error.status === 404) {
     this.errMessage = `Http failure response for ${error.url}: 404 Not Found`;
   } else {
     this.errMessage = 'An error occurred:' + error.error.message;
   }
 }
  private reset() {
   
    this.errMessage = null;
    this.errorMessage = null;
    this.id= null;
    this.nameModel.control.reset();
    this.nameModel.control.setErrors(null);
    this.typeModel.control.reset();
    this.typeModel.control.setErrors(null);
    this.reminderDescription= '';
  }
}
