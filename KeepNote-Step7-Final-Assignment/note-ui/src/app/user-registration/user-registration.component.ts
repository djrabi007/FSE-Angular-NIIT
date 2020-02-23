import { Component, OnInit, ViewChild} from '@angular/core';
import { User, UserServiceRequest } from '../user-model';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service'
import { RouterService } from '../services/router.service';
@Component({
  selector: 'note-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  user: User = new User();
  hide = true;
   
  @ViewChild("f")
  form: any;
  errMessage:any
  constructor(
      private userService: UserService,
      private router: Router,
    private routerService: RouterService) {

      }

  ngOnInit() {
    this.user.firstName="Jhon";
    this.user.lastName="Doe"
    this.user.userId="jd@stackroute.in";
    this.user.userPassword="jdssecret@1234";
   
    
  }

  onSubmit(){
  	if(this.form.valid){
     
      let user = new User();
      user.userId = this.user.userId;
      user.firstName = this.user.firstName;
      user.lastName = this.user.lastName;
      user.userPassword = this.user.userPassword;

      this.userService.doRegister(user).subscribe(response=>{
      console.log("Sign UP success");
      this.routerService.routeToLogin();
    },error=>{
      if(error.status ==409){
        this.errMessage = "User Already Exists";
      }
    });

    }
  }

  resetForm(){
    this.form.resetForm();
  }

  
}
