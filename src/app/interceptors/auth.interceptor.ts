import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem(environment.keyToken);
    const sessionId = localStorage.getItem(environment.keySessionId);
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', token).set('sessionId', sessionId)

      });
      return next.handle(cloned).pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          if (error.status != null && error.status === 401) {
            this.router.navigate(["/login"]);
          }
          return throwError(error);
        })
      );

    } else {
      return next.handle(req);
    }
  }
}
