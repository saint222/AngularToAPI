import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { loginRequest } from '../models/loginRequest';
import { loginResponse } from './../models/loginResponse';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  protected basePath = 'http://demo.oybek.com/oauth/token';

  @Input() loginRequestModel: loginRequest;
  @Input() loginResponseModel: loginResponse;

  constructor(private http: HttpClient, private router: Router) { }

  login(loginRequestModel: loginRequest): Observable<loginResponse> {

    let str = [];
    for (var key in loginRequestModel) {
      if (loginRequestModel.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key) + '=' + encodeURIComponent(loginRequestModel[key]))
        console.log(key + ' -> ' + loginRequestModel[key]);
      }
    }
    let result = str.join('&');

    return this.http.post<loginResponse>(this.basePath, result);
  }

  isAuthorised() {
    return !!localStorage.getItem('token');
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login'])
  }

}
// Эндпойнт ождает стрингу вида: username=SOMETHING&password=SOMETHING&grant_type=password
