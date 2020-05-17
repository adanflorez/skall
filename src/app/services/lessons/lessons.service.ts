import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  constructor(private http: HttpClient) { }

  getLesson(pages: number, search: string, size: number, publicKey: string): Observable<any> {
    return this.http.post(environment.baseURL + `lesson/search/${pages}`, {
      filter: {
        search,
        size
      },
      publicKey
    });
  }

  getCategoriesLesson() {
    return this.http.get(environment.baseURL + 'categoryLesson/');
  }


  create(
    categoryLesson: string,
    description: string,
    name: string,
    password: string
  ): Observable<any> {
    return this.http.post(environment.baseURL + 'lesson/create', {
      categoryLesson,
      description,
      name,
      password
    });
  }

}
