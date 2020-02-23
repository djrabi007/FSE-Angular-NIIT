import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder,NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-view',
  templateUrl: './view-selector.component.html',
  styleUrls: ['./view-selector.component.css']
})
export class ViewSelectorComponent implements OnInit {
   selectedView : any;
   viewSelect: FormGroup;
   views=[{
     id : 1,
     name : 'Note'
   },{
     id : 2,
     name : 'Category'
   },{
     id : 3,
     name : 'Reminder'
   }];


  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private routerService: RouterService,private fb: FormBuilder) { }

  ngOnInit() {
    this.viewSelect = this.fb.group({
      viewSelect :[null,Validators.required]
    });
    const toSelect = this.views.find(view=>view.id==1);
    this.viewSelect.get('viewSelect').setValue(toSelect.name);
    this.selectedView = toSelect.name;
  }

  viewSubmit() {
   
   switch(this.selectedView){
     case  "Note":{
       this.routerService.routeToNoteCardView();
       break;
     }
     case  "Category":{
       this.routerService.routeToCategoryCardView();
        break;
     }
     case  "Reminder":{
       this.routerService.routeToReminderCardView();
        break;
     }
     default:{
       this.routerService.routeToDashboard();
       break;
     }
   }
  }
}
