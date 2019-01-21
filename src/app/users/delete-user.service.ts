import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  apiUrl = '/api/users/delete/';
  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  deleteUser(userId: number) {
    return this.http.patch(`${this.apiUrl}` + userId,
    {
      'isActive': 'false'
    })
    .subscribe({
      next: x => console.log('Observers next value: ' + x),
      error: err => console.log(err),
      complete: () => this.router.navigate(['/users'])
    });
  }
}
