import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'user-logout',
  templateUrl: './user-logout.component.html',
  styleUrls: ['./user-logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  	this.logout();
  }

  logout(){
  	this.authService.doLogout();
  }

}
