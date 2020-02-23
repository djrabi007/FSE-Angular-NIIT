import { Component,Inject,ViewChild,TemplateRef } from '@angular/core';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef} from '@angular/material';
import {Reminder} from '../reminder';
import { ActivatedRoute, Params } from '@angular/router';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { ReminderService } from '../services/reminder.service';
import {EditReminderViewComponent} from '../edit-reminder-view/edit-reminder-view.component';
import { RouterService } from '../services/router.service';
@Component({
  selector: 'app-edit-reminder-opener',
  templateUrl: './edit-reminder-opener.component.html',
  styleUrls: ['./edit-reminder-opener.component.css']
})
export class EditReminderOpenerComponent {
 
 reminderId : String
 reminder : Reminder;
 dialogRef : MatDialogRef<EditReminderViewComponent>
// @ViewChild('editNoteViewComponent')
 // dialogComponent: TemplateRef<any>;

  
constructor(private route: ActivatedRoute,private router: Router,
    private dialog:MatDialog,
    private reminderService: ReminderService,private routeService: RouterService,) {
 this.reminder = this.reminderService.getReminderById( this.route.snapshot.params.reminderId);

this.openDialog(this.reminder);

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
  openDialog(reminder: Reminder) {
    this.dialogRef = this.dialog.open(EditReminderViewComponent,{width: '250px',disableClose: true,data : { reminder:reminder}});
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.routeService.routeBack();
    });
  }
   
}


    

