import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getInterest(): Observable<any> {
    return this.http.get(environment.baseURL + 'interest/');
  }

  update(userForm: FormGroup): Observable<any> {
    console.log(userForm);
    const form = userForm.controls;
    const address = form['address'].value;
    const age = form['age'].value;
    const gender = form['gender'].value;
    const job = form['job'].value;
    return this.http.put<any>(environment.baseURL + 'user/update', {
      address,
      age,
      gender,
      job
    });
  }

  updateEducation(userEducationForm: FormGroup, dateInit: Date, dateFinish: Date): Observable<any> {
    console.log(dateInit);
    console.log(dateFinish);
    console.log(userEducationForm);
    const form = userEducationForm.controls;
    const institution = form['institution'].value;
    const levelOfStudy = form['levelOfStudy'].value;
    const profesion = form['profesion'].value;
    const interest = form['interest'].value;
    return this.http.put(environment.baseURL + 'user/update/education',
      {
        education: [
          {
            finishEducation: dateFinish,
            initEducation: dateInit,
            institution,
            levelOfStudy,
            profesion
          }
        ],
        interest,
        skill: []
      }
    );
  }

  createPost(code: string, description: string, img?: string): Observable<any> {
    return this.http.post(environment.baseURL + 'publication/create',
      {
        code,
        description,
        img
      }
    );
  }

  getAllPost(): Observable<any> {
    return this.http.post(environment.baseURL + 'publication/all',
      {
        page: 0,
        size: 20
      }
    );
  }

  postUploadFile(formData: FormData){
    return this.http.post(environment.baseURL + 'publication/upload',
      formData
    );
  }
}
