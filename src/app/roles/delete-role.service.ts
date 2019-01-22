import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeleteRoleService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  apiUrl = '/api/roles/delete';
  constructor(
    private http: HttpClient,
  ) { }

  deleteRole(roleId: number) {
    return this.http.patch(`${this.apiUrl}` + roleId, {
      'isActive': 'false'
    });
  }
}
