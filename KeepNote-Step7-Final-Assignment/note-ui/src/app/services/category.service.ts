import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Injectable,Output,EventEmitter } from '@angular/core';
import { Category } from '../category';
import 'rxjs/add/observable/throw';
import {HttpClient} from '@angular/common/http';
import {Response,RequestOptions} from '@angular/http';
import {HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {HttpErrorResponse} from '@angular/common/http'
import { Component, OnInit,Input} from '@angular/core';
@Injectable()
export class CategoryService implements OnInit{
  //url = "http://localhost:9400/api/v1/category"
  // url = "/categoryservice/api/v1/category";
   url = "http://localhost:9400/categoryservice/api/v1/category"
   //url = "http://localhost:9300/categoryservice/api/v1/category"
  categories: Array<Category>;
  categorySubject: BehaviorSubject<Array<Category>>;
  
  constructor(private http:HttpClient) { 
     
   }
  ngOnInit(){
      this.categorySubject = this.getCategories(localStorage.getItem("userId"));
  }
 
  private extractData(res: Response) {

    let body = res;
    return body;
  }

  fetchCategoriesFromServer(userId) : Observable<Array<Category>> {
    return this.http.get(`${this.url}/${userId}`)
    .map(this.extractData)
    .catch(this.handleErrorObservable);
    ;
  }

  getCategories(userId): BehaviorSubject<Array<Category>> {
    this.categorySubject = new BehaviorSubject<Array<Category>>(new Array<Category>());
     this.fetchCategoriesFromServer(userId).subscribe(
      categories => {this.categories = categories; this.categorySubject.next(this.categories)},
      error =>  this.handleErrorObservable(error));
     return this.categorySubject;
  }

  addCategory(category: Category): Observable<Object> {
    //let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    //return this.http.post(this.url, category,{observe:'response'});
    let userId=localStorage.getItem("userId");
    return this.http.post(this.url+'/'+userId, category,{observe:'response'});
    
  }

  editCategory(category: Category): Observable<Category> {
 let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.url}/${category.categoryId}`, category)
    .map(this.extractData)
    .catch(this.handleErrorObservable);
  }
 deleteCategory(category: Category): Observable<Object> {
 
    return this.http.delete(`${this.url}/${localStorage.getItem("userId")}/${category.categoryId}`);
    
  }
  getCategoryById(categoryId:String): Category {
    let returnCategory : Category = null;
    this.categorySubject.subscribe((categories)=>{
      this.categories = categories;
      this.categories.forEach(category=>{
        if(category.categoryId.toString()===categoryId)
        {    
            returnCategory = category;
            
        }
    })
    });
    return returnCategory;
 
  }
   private handleErrorObservable (error: HttpErrorResponse | any) {
    console.error(error.message || error);
    
    return Observable.throw(new HttpErrorResponse(error));
  }

  
}
