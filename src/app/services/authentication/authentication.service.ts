import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import User from 'src/app/models/user.interface';
import { environment } from 'src/environments/environment';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user: User, fileUrl: string): Observable<any> {
    user.logo = fileUrl;
    return this.http.post<any>(environment.baseURL + 'auth/register', user);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>('http://54.166.173.51:9764/auth/',
      {
        username,
        password
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('sessionId');
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
