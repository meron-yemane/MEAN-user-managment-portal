import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'models/user';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  apiUrl = '/api/users';
  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    user.creationDate = new Date().getTime();
    return this.http.post<User>(`${this.apiUrl}`, user, this.httpOptions);
  }

}
