import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetRolesService {
  apiUrl = '/api/roles';

  constructor(private http: HttpClient) { }

  getSingleRole(roleId: number) {
    return this.http.get(`${this.apiUrl}` + '/' + roleId);
  }

  getRoles() {
    return this.http.get(`${this.apiUrl}`);
  }
}
