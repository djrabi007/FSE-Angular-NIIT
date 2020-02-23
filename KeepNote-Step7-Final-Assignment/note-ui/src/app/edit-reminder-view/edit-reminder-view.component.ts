import { Component, OnInit, Inject, OnDestroy,Input } from '@angular/core';
import { Reminder } from '../reminder';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialog } from '@angular/material/dialog';
import { RouterService } from '../services/router.service';
import { ReminderService } from '../services/reminder.service';

@Component({
  selector: 'app-edit-reminder-view',
  templateUrl: './edit-reminder-view.component.html',
  styleUrls: ['./edit-reminder-view.component.css']
})
export class EditReminderViewComponent implements OnInit, OnDestroy {
  public reminder: Reminder;
  
  errMessage: string;
  
  constructor(private dialogRef: MatDialogRef<EditReminderViewComponent>,public dialog: MatDialog,
    private routeService: RouterService,
    private reminderService: ReminderService,
    @Inject(MAT_DIALOG_DATA) private data: { reminder: Reminder }) { 
    this.dialogRef.disableClose = true;

}

  ngOnInit() {
   
   this.reminder = this.data.reminder;
   // this.note = this.notesService.getNoteById(this.route.snapshot.params.noteId);
   
  }

  ngOnDestroy() {
   
    
    
     
  }
validateReminder(): boolean {
   if (this.reminder.reminderName === undefined || this.reminder.reminderType === '' ||
       !this.reminder.reminderName.trim() ||this.reminder.reminderType === undefined ||
       this.reminder.reminderName === '' || !this.reminder.reminderType.trim()
       ) {
         // add the error message when any field is empty
     this.errMessage = 'Name and Type both are required fields';
     return false;
   }
   return true;
 }
  onSave() {
    if(this.validateReminder()){

    this.reminderService.editReminder(this.reminder).subscribe((editedReminder) => {
      this.dialogRef.close();
      this.routeService.routeBack();
    },
      (err: any) => {
      this.errMessage = err.message;
    });
   
 
    }
  }
}
