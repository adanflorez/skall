import { FormGroup } from "@angular/forms";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParlorService {

  constructor(private http: HttpClient) {
  }

  getParlor(): Observable<any> {
    return this.http.get(environment.baseURL + 'parlor/');
  }

  updateParlor(parlorForm: FormGroup): Observable<any> {
    console.log(parlorForm);
    const form = parlorForm.controls;
    const name = form['name'].value;
    const description = form['description'].value;
    const url = form['url'].value;
    const email = form['email'].value;
    const phoneNumber = form['phoneNumber'].value;
    return this.http.put(environment.baseURL + 'parlor/update', {
      notifyUrl: url,
      parlorDescription: description,
      parlorEmail: email,
      parlorName: name,
      parlorPhoneNumber: phoneNumber
    });
  }

  getParlorTop(): Observable<any> {
    return this.http.get(environment.baseURL + 'parlor/top')
  }
}
