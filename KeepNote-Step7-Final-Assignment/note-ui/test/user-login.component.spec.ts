import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../src/app/services/authentication.service';
import { UserService } from '../src/app/services/user.service';
import { LoginComponent } from '../src/app/login/login.component';
import { AppMaterialThemeModule } from '../src/app/app-material-theme/app-material-theme.module';
import { RouterService } from '../src/app/services/router.service';
import { 
  HttpClientTestingModule, 
  HttpTestingController 
} from '@angular/common/http/testing';
import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';


describe('UserLoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthenticationService;
  let userService : UserService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppMaterialThemeModule,
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ LoginComponent ],
      providers: [
        UserService,
        AuthenticationService,RouterService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    authService = TestBed.get(AuthenticationService);
    userService = TestBed.get(UserService);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    component.signInForm.reset();
    fixture.detectChanges();
    
    expect(component.signInForm.valid).toBeFalsy();
  });

  it('UserId field is required', () => {
    component.signInForm.reset();
    fixture.detectChanges();
    let userId = component.signInForm.controls['userId'];

    expect(userId.errors['required']).toBeTruthy();
  });

  it('Password field is required', () => {
    component.signInForm.reset();
    fixture.detectChanges();
    let password = component.signInForm.controls['userPassword'];

    expect(password.errors['required']).toBeTruthy();
  });

  it('Resetting form should reset all fields', () => {
    component.resetForm();
    fixture.detectChanges();
    let password = component.signInForm.controls['userPassword'];
    let userId = component.signInForm.controls['userId'];
    
    expect(password.value).toBeNull();
    expect(userId.value).toBeNull();
  });

  it('Submitting form should trigger user loginin process', () => {
    
    const authServiceSpy = spyOn(userService, 'doLogin').and.callThrough();
    component.onSubmit();
       
    expect(authServiceSpy).toHaveBeenCalled();
  });

});