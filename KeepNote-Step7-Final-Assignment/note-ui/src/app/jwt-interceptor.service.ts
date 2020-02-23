import { Injectable } from '@angular/core';
import { 
    HttpInterceptor, 
    HttpRequest, 
    HttpHandler, 
    HttpEvent,
    HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';


// Movie Cruiser Http Authentication interceptor
@Injectable()
export class JwtInterceptor implements HttpInterceptor{

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    
     console.log("jwt interceptor: Found user auth token...")
     console.log(request.url);
     let userAuthToken = localStorage.getItem("userAuthtoken")

     if(userAuthToken){
       request = request.clone({
         setHeaders:{
           Authorization: userAuthToken
         }
       });
    } else {
      console.log("jwt interceptor: Not found user auth token...")
    }
    
    return next.handle(request);
  }

}