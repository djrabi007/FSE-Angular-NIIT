import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';



@Injectable()
export class AuthenticationService {

  private userAuthToken = "userAuthtoken";
   private userId = "userId";
  private userLoginStatus = new BehaviorSubject<boolean>(false);
  
  constructor(private router: Router) { }

  private clearAuthTokenFromLocalStorage(){
    localStorage.clear();
  }

  private saveAuthtokenToLocalStorage(authToken: string){
    localStorage.setItem(this.userAuthToken, authToken);
  }
  private saveUserIdToLocalStorage(userId: string){
    localStorage.setItem(this.userId, userId);
  }

  saveAuthToken(authToken: string){
    this.saveAuthtokenToLocalStorage(authToken)
    this.userLoginStatus.next(true);

  }
  saveUserId(userId: string){
    this.saveUserIdToLocalStorage(userId);
   
  }
 doLogout(){
  	localStorage.clear();
  	this.router.navigate(['/login']);
  }
  invalidateUserSession(){
    this.clearAuthTokenFromLocalStorage();
    this.userLoginStatus.next(false);
    this.router.navigate(['/']);
  }

  get isUserSessionValid(): Observable<boolean> {
    return this.userLoginStatus.asObservable();
  }

}
