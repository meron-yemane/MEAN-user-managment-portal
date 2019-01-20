import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetPermissionsService {
  apiUrl = 'api/permissions';
  constructor(private http: HttpClient) { }

  getPermissions() {
    return this.http.get(`${this.apiUrl}`);
  }
}
