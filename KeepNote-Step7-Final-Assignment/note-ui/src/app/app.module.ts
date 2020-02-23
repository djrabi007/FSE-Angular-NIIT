import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {AppComponent} from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {HeaderComponent} from './header/header.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './user-logout/user-logout.component';
import {ViewSelectorComponent} from './view-selector/view-selector.component';
import {AppMaterialThemeModule} from './app-material-theme/app-material-theme.module';
import {AuthenticationService} from './services/authentication.service';
import {CanActivateRouteGuard} from './can-activate-route.guard';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from './jwt-interceptor.service';
import { NotesService} from './services/notes.service';
import { CategoryService} from './services/category.service';
import { ReminderService} from './services/reminder.service';
import { RouterService} from './services/router.service';
import { UserService} from './services/user.service';
import {BrowserModule} from '@angular/platform-browser';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatCardModule,MatToolbarModule,MatSelectModule,MatDialogModule} from '@angular/material';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {NoteCardViewComponent} from './note-card-view/note-card-view.component';
import {NoteComponent} from './note/note.component';
import {NoteListViewComponent} from './note-list-view/note-list-view.component';
import {EditNoteOpenerComponent} from './edit-note-opener/edit-note-opener.component';
import {EditNoteViewComponent}from './edit-note-view/edit-note-view.component';
import {NoteTakerComponent} from './note-taker/note-taker.component';

import {CategoryCardViewComponent} from './category-card-view/category-card-view.component';
import {CategoryComponent} from './category/category.component';
import {EditCategoryOpenerComponent} from './edit-category-opener/edit-category-opener.component';
import {EditCategoryViewComponent}from './edit-category-view/edit-category-view.component';
import {CategoryTakerComponent} from './category-taker/category-taker.component';
import {MatSnackBarModule} from '@angular/material';
import {ReminderCardViewComponent} from './reminder-card-view/reminder-card-view.component';
import {ReminderComponent} from './reminder/reminder.component';
import {EditReminderOpenerComponent} from './edit-reminder-opener/edit-reminder-opener.component';
import {EditReminderViewComponent}from './edit-reminder-view/edit-reminder-view.component';
import {ReminderTakerComponent} from './reminder-taker/reminder-taker.component';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialog } from '@angular/material/dialog';
import {UserRegistrationComponent} from './user-registration/user-registration.component';
import { FlexLayoutModule } from "@angular/flex-layout";

const appRoutes : Routes = [
{
  path : 'dashboard',
  component :DashboardComponent,
  canActivate : [CanActivateRouteGuard],
  children : [
      { path: 'note/view/cardview', component: NoteCardViewComponent },
      { path: 'note/view/listview', component: NoteListViewComponent },
      { path: 'category/view/cardview', component: CategoryCardViewComponent },
      { path: 'reminder/view/cardview', component: ReminderCardViewComponent },
      {
    path: "note/:noteId/edit",
    component: EditNoteOpenerComponent ,
    outlet: "noteEditOutlet",
    //,
    canActivate : [CanActivateRouteGuard]
  },
     // {path : '', redirectTo : 'note/view/cardview', pathMatch: 'full' }
   
      
      {
    path: "category/:categoryId/edit",
    component: EditCategoryOpenerComponent ,
    outlet: "categoryEditOutlet",
    //,
    canActivate : [CanActivateRouteGuard]
  },
  
      
      {
    path: "reminder/:reminderId/edit",
    component: EditReminderOpenerComponent ,
    outlet: "reminderEditOutlet",
    //,
    canActivate : [CanActivateRouteGuard]
  }   

  ]
},
{
    path : 'registration',
  component :UserRegistrationComponent

},
{
    path : 'logout',
  component :LogoutComponent

},
{
    path : 'login',
  component :LoginComponent

},
{
  path : 'componentview',
  component: ViewSelectorComponent//,
  //canActivate : [CanActivateRouteGuard]
},
{
   path: '', redirectTo: 'login', pathMatch: 'full'//,
   //canActivate : [CanActivateRouteGuard]
}
]
@NgModule({
  declarations: [ AppComponent,HeaderComponent,DashboardComponent,LoginComponent,LogoutComponent,NoteCardViewComponent,NoteListViewComponent,EditNoteOpenerComponent,NoteTakerComponent,NoteComponent,EditNoteViewComponent,ViewSelectorComponent,UserRegistrationComponent,
CategoryCardViewComponent,EditCategoryOpenerComponent,CategoryTakerComponent,CategoryComponent,EditCategoryViewComponent,
ReminderCardViewComponent,EditReminderOpenerComponent,ReminderTakerComponent,ReminderComponent,EditReminderViewComponent
  ],
  imports: [AppMaterialThemeModule,RouterModule.forRoot(appRoutes, {enableTracing : true}),//HttpModule,
    HttpClientModule,BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    FormsModule,MatSnackBarModule,
    FlexLayoutModule,
    //HttpModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,MatDialogModule],
    entryComponents: [EditNoteViewComponent,EditCategoryViewComponent,EditReminderViewComponent],
  providers: [AuthenticationService,CanActivateRouteGuard,NotesService,RouterService,UserService,CategoryService,ReminderService,
     
  {
  	provide : HTTP_INTERCEPTORS,
  	useClass : JwtInterceptor,
  	multi : true
  } ],
  bootstrap: [ AppComponent]
})

export class AppModule { }
