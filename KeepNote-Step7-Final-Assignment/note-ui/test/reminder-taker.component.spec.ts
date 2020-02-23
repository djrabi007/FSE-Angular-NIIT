import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReminderTakerComponent } from '../src/app/reminder-taker/reminder-taker.component';
import { NotesService } from '../src/app/services/notes.service';
import { CategoryService } from '../src/app/services/category.service';
import { ReminderService } from '../src/app/services/reminder.service';
import { RouterService } from '../src/app/services/router.service';
import { AuthenticationService } from '../src/app/services/authentication.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

const testConfig = {
    addReminders: {
      positive: {
      reminderId: 1,
      reminderName: 'Morning Reminder',
      reminderDescription: 'IPL',
      reminderType: 'Sports',
      reminderCreatedBy :'abcd1234',
       reminderCreationDate : null
      },
      errorMessage: 'Title and Text both are required fields'
    },
    error404: {
      message: 'Http failure response for http://localhost:3000/api/v1/notes: 404 Not Found',
      name: 'HttpErrorResponse',
      ok: false,
      status : 404,
      statusText: 'Not Found',
      url: 'http://localhost:3000/api/v1/notes'
    }
  };

describe('ReminderTakerComponent', () => {
  let reminderTakerComponent: ReminderTakerComponent;
  let fixture: ComponentFixture<ReminderTakerComponent>;
  let reminderService: ReminderService;
  let spyTakeNotes: any;
  let errorResponse404: any;
  let positiveResponse: any = null;
  let errorMessage: string;
  let debugElement: any;
  let element: any;
  let doneButton: any;
  let inputBox: any;
  let textArea: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderTakerComponent ],
      imports: [
      FormsModule,
      MatInputModule,
      MatAutocompleteModule,
      MatCheckboxModule,
      MatDatepickerModule,
      MatFormFieldModule,
      MatInputModule,
      MatRadioModule,
      MatSelectModule,
      MatSliderModule,
      MatSlideToggleModule,
      MatMenuModule,
      MatSidenavModule,
      MatToolbarModule,
      MatCardModule,
      MatExpansionModule,
      MatGridListModule,
      MatListModule,
      MatStepperModule,
      MatTabsModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatChipsModule,
      MatIconModule,
      MatProgressSpinnerModule,
      MatProgressBarModule,
      MatDialogModule,
      MatSnackBarModule,
      MatTooltipModule,
      MatPaginatorModule,
      MatSortModule,
      MatTableModule,
      HttpClientModule,
      BrowserAnimationsModule,RouterTestingModule
      ],
      providers: [ NotesService, AuthenticationService,RouterService,CategoryService,ReminderService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderTakerComponent);
    reminderTakerComponent = fixture.componentInstance;
    reminderService = fixture.debugElement.injector.get(ReminderService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(reminderTakerComponent).toBeTruthy();
  });

  it('should handle 404 error on add reminder', fakeAsync(() => {
    errorResponse404 = testConfig.error404;
    doneButton = fixture.debugElement.nativeElement.querySelector('button');
    inputBox = fixture.debugElement.nativeElement.querySelector('input');
    textArea = fixture.debugElement.nativeElement.querySelector('textarea');
    debugElement = fixture.debugElement.query(By.css('.error-message'));

    spyTakeNotes = spyOn(reminderService, 'addReminder').and.returnValue(Observable.throw(errorResponse404));
    if (inputBox !== null && textArea !== null && doneButton !== null && debugElement !== null) {
      inputBox.value = testConfig.addReminders.positive.reminderName
      inputBox.dispatchEvent(new Event('input'));
      textArea.value = testConfig.addReminders.positive.reminderDescription;
      textArea.dispatchEvent(new Event('input'));
      doneButton.click();
      tick();
      fixture.detectChanges();
      element = debugElement.nativeElement;
      expect(element.textContent).toBe('Name and Type both are required fields',
        `should handle 'error' event of subscribe and assign 'message' property of error to the errorMessage variable`);
    } else {
      expect(false).toBe(true,
        `should have elements input, textarea, button
        and <label class='error-message'>{{ errMessage }}</label> in your reminder-taker.component.html`);
    }
  }));

   it('should handle blank fields', fakeAsync(() => {
     errorMessage = testConfig.addReminders.errorMessage;
     doneButton = fixture.debugElement.nativeElement.querySelector('button');
     debugElement = fixture.debugElement.query(By.css('.error-message'));
     spyTakeNotes = spyOn(reminderService, 'addReminder').and.returnValue(Observable.of(errorMessage));
     if (doneButton !== null && debugElement !== null) {
       doneButton.click();
       tick();
       fixture.detectChanges();
       element = debugElement.nativeElement;
       expect(element.textContent).toBe('Name and Type both are required fields',
         `if there is no value in title or tex input fields, assigne error message to errorMessage variable
         as 'Title and Text both are required fields'`);
     } else {
       expect(false).toBe(true,
         `should have elements button and <label class='error-message'>{{ errMessage }}</label> in your reminder-taker.component.html`);
     }
  }));

  it('should handle adding of a new reminder', fakeAsync(() => {
    positiveResponse = testConfig.addReminders.positive;
    doneButton = fixture.debugElement.nativeElement.querySelector('button');
    inputBox = fixture.debugElement.nativeElement.querySelector('input');
    textArea = fixture.debugElement.nativeElement.querySelector('textarea');
    spyTakeNotes = spyOn(reminderService, 'addReminder').and.returnValue(Observable.of(positiveResponse));
    fixture.detectChanges();
    tick();
    if (inputBox !== null && textArea !== null && doneButton !== null) {
      inputBox.value = testConfig.addReminders.positive.reminderName;
      textArea.value = testConfig.addReminders.positive.reminderType;
      inputBox.dispatchEvent(new Event('input'));
      textArea.dispatchEvent(new Event('input'));
      doneButton.click();
      tick();
      fixture.detectChanges();
      //expect(reminderService.addReminder).toHaveBeenCalled();
    } else {
      expect(false).toBe(true,
       `should have elements input, textarea and button in your reminder-taker.component.html`);
    }
  }));
});
