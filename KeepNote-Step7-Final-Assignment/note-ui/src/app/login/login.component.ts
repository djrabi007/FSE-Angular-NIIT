import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder,AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user-model';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';
import { UserService } from '../services/user.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;
  hide = true;
  errMessage : any;
  constructor(
      private fb: FormBuilder,
      private userService: UserService,
      private routerService : RouterService,
      private authenticationService : AuthenticationService) {
  }

  ngOnInit() {
    this.createSignInForm();
  }

  createSignInForm(){
    this.signInForm = this.fb.group({
      userId: ['jd@stackroute.in', [Validators.required, Validators.email]],
      userPassword: ['jdssecret@1234', Validators.required]
    });
  }

  onSubmit(){
    if(this.signInForm.valid){
      console.log(this.signInForm.value);
      
      let user = new User()
      user.userId = this.signInForm.value.userId;
      user.userPassword = this.signInForm.value.userPassword;
      
      
      this.userService.doLogin(user).subscribe(response=>{
      console.log("Login success");
      console.log("Token"+response['userAuthtoken']);
      this.authenticationService.saveAuthToken(response['userAuthtoken']);
      this.authenticationService.saveUserId(user.userId);
      this.routerService.routeToComponentView();
      this.resetForm();
    },error=>{
      if(error.status ==401){
       this.errMessage = "Unauthorized User"
      }
    });
;

      
    }
  }

  resetForm(){
    let control: AbstractControl = null;
    this.signInForm.reset();
    Object.keys(this.signInForm.controls).forEach(
      (name) => {
        control = this.signInForm.controls[name];
        control.setErrors(null);
      });
  }
}
