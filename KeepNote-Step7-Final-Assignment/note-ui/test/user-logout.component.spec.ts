import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { 
  HttpClientTestingModule, 
  HttpTestingController 
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from "@angular/platform-browser";
import { LogoutComponent } from '../src/app/user-logout/user-logout.component';
import { AuthenticationService } from '../src/app/services/authentication.service';
import { UserService } from '../src/app/services/user.service';
import { AppMaterialThemeModule } from '../src/app/app-material-theme/app-material-theme.module';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        AppMaterialThemeModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ LogoutComponent ],
      providers:[
        UserService,
        AuthenticationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});