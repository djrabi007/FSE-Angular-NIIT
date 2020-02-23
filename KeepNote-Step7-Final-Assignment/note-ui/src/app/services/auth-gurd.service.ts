import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGurdService implements CanActivate {

	private userAuthToken = "userAuthtoken";
	constructor(private router: Router){}

	canActivate(): boolean {
		let authToken: string = localStorage.getItem(this.userAuthToken);

		if(authToken){
			console.log("auth gurd found - valid session")
			return true;
		}
	
		console.log("auth gurd not found - invalid session")
		this.router.navigate(['/']);
		return false;
	}

}