import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditRoleService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  apiUrl = '/api/roles/';

  constructor(
    private http: HttpClient
  ) { }

  editRole(role: Object, roleId: number): Observable<Object> {
    return this.http.patch<Object>(`${this.apiUrl}` + roleId, role, this.httpOptions);
  }
}
