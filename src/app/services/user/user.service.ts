import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getDetail(): Observable<any> {
    return this.http.get(environment.baseURL + 'user/detail');
  }

  uploadPhoto(formData: FormData, email: string): Observable<any> {
    console.log(formData);
    console.log(email);
    let headers = new HttpHeaders();
    headers = headers.set('Email', email);
    return this.http.post(environment.baseURL + 'user/upload/file',
      formData,
      { headers }
    );
  }

  searchParlor(pages: number, search: string, size: number): Observable<any> {
    return this.http.post(environment.baseURL + `parlor/getByParlor${pages}`,
      {
        filter: {
          search,
          size
        }
      }
    );
  }
}
