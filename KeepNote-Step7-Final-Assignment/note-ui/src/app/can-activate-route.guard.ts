import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';
@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private routerService: RouterService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let authToken:string = localStorage.getItem('userAuthtoken');
    if(authToken){
      return true;
    }
    this.routerService.routeToLogin();
    return false;
  }
}
