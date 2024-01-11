import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse 
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators'
@Injectable()
export class myHttpInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
    const token = localStorage.getItem('loginResponse');

  return next.handle(request).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
                    this.router.navigate(['/login']);
               localStorage.clear();
       }
    }
    return throwError(err);
  })
   )
  }
  }
