import { Component,Input,OnInit } from '@angular/core';
import {Reminder} from '../reminder';
import {HttpErrorResponse} from '@angular/common/http'
import { ReminderService } from '../services/reminder.service';
@Component({
  selector: 'app-reminder-card-view',
  templateUrl: './reminder-card-view.component.html',
  styleUrls: ['./reminder-card-view.component.css']
})
export class ReminderCardViewComponent implements OnInit{

 reminders : Reminder[];
 errorMessage: String;
  constructor(private reminderService: ReminderService) { 


  }
 errMessage: String;
  ngOnInit(): void {
   
    this.reminderService.getReminders(localStorage.getItem("userId")).subscribe(

    reminders=> this.reminders=reminders,

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
