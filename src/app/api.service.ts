import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Registration } from './registration';
import {catchError}  from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  post(c):Observable<Registration>{
    return  this.http.post<Registration>('http://localhost:3000/posts',c)
    .pipe(catchError(this.errorHandler))
   }


  get():Observable<Registration[]>{
    return this.http.get<Registration[]>('http://localhost:3000/posts')
    
  }

  

   errorHandler(error:HttpErrorResponse){
        return throwError(error);
   }

}
