import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { Location } from '@angular/common';
@Injectable()
export class RouterService {

  constructor(private router : Router, private location : Location) { }

   routeToComponentView() {
   this.router.navigate(['/componentview']);
  }
   routeToDashboard() {
   this.router.navigate(['/dashboard']);
  }

  routeToLogin() {
    this.router.navigate(['/login']);
  }


  routeToRegistration() {
    this.router.navigate(['/registration']);
  }

  routeToEditNoteView(noteId) {

   this.router.navigate(['/dashboard',{outlets: {noteEditOutlet: ['note',noteId,'edit']}}]);

  }
  routeToEditCategoryView(categoryId) {

   this.router.navigate(['/dashboard',{outlets: {categoryEditOutlet: ['category',categoryId,'edit']}}]);

  }
  routeToEditReminderView(reminderId) {

   this.router.navigate(['/dashboard',{outlets: {reminderEditOutlet: ['reminder',reminderId,'edit']}}]);

  }

  routeBack() {
   this.location.back();
  }

  routeToNoteCardView() {
    this.router.navigate(['/dashboard/note/view/cardview']);
  }

  routeToNoteListView() {
    this.router.navigate(['/dashboard/note/view/listview']);
  }
  routeToCategoryCardView() {
    this.router.navigate(['/dashboard/category/view/cardview']);
  }

 
  routeToReminderCardView() {
    this.router.navigate(['/dashboard/reminder/view/cardview']);
  }

}
