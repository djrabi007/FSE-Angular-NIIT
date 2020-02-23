import {Component, Inject,Input} from '@angular/core';
import {Reminder} from '../reminder';
import {EditReminderOpenerComponent} from '../edit-reminder-opener/edit-reminder-opener.component';
import {RouterService} from '../services/router.service';
import {ReminderService} from '../services/reminder.service';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-reminder',
  templateUrl: 'reminder.component.html',
  styleUrls: ['reminder.component.css'],
})
export class ReminderComponent {

  @Input('reminder') reminder: Reminder;
   errMessage:any;
deletedReminder : Reminder;

  constructor(private routerService : RouterService,private reminderService : ReminderService,private snackBar: MatSnackBar) {}

  click() : void {
  	
  	this.routerService.routeToEditReminderView(this.reminder.reminderId);
  }
  delete():void{
    this.reminderService.deleteReminder(this.reminder).subscribe(response=>{

      this.deletedReminder = this.reminderService.reminders.find(reminder=>reminder.reminderId==this.reminder.reminderId);
      this.reminderService.reminders.splice(this.reminderService.reminders.indexOf(this.deletedReminder),1);
      this.openSnackBar('Reminder '+this.deletedReminder.reminderName+' deleted','Success');
    },
   error=>this.handleErrorResponse(error));

    
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

