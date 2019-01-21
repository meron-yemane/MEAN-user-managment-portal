import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Role } from 'models/role';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateRoleService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  apiUrl = '/api/roles';

  constructor(private http: HttpClient) { }

  createRole(role: Role): Observable<Role> {
    return this.http.post<Role>(`${this.apiUrl}`, role, this.httpOptions);
  }
}
