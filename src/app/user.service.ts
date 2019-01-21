import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  apiUrl = 'api/users/';
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(`${this.apiUrl}`);
  }

  getSingleUser(userId: number) {
    return this.http.get(`${this.apiUrl}` + userId);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}`, user, this.httpOptions);
  }
}
