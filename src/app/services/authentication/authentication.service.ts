import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import User from 'src/app/models/user.interface';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<any> {
    return this.http.post<any>(environment.baseURL + 'auth/register', user);
  }
}
