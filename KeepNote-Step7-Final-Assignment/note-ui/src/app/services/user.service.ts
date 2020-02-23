import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient,HttpResponse,HttpParams,HttpHeaders} from '@angular/common/http';

import {HttpErrorResponse} from '@angular/common/http';
import { User, UserServiceRequest,UserServiceResponse } from '../user-model';
import { AuthenticationService } from '../services/authentication.service';

import {catchError} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class UserService {

  //serviceUrl: string = 'http://localhost:9100/api/v1/auth';
   //serviceUrl: string = '/authenticationservice/api/v1/auth';
  serviceUrl: string = 'http://localhost:9100/AuthenticationService/api/v1/auth';

  constructor(
    private _httpClient: HttpClient, 
    private router: Router,
    private authService: AuthenticationService ) { 

  }
  
  doRegister(user: User) :Observable<Object>{
    let registrationUrl: string = `${this.serviceUrl}/register`;
    return this._httpClient.post(registrationUrl,user);
    
  }

  doLogin(user: User):Observable<Object>{

    let loginUrl: string = `${this.serviceUrl}/login`;
    return this._httpClient.post(loginUrl,user);
    
  }

 
}