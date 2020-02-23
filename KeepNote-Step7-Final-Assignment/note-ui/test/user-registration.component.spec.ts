import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserRegistrationComponent } from '../src/app/user-registration/user-registration.component';
// dependencies for building Model driven and reactive forms
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { UserService } from '../src/app/services/user.service'
import { AuthenticationService } from '../src/app/services/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { RouterService } from '../src/app/services/router.service';

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
      ],
      declarations: [ UserRegistrationComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers:[
        UserService,
        AuthenticationService,RouterService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
