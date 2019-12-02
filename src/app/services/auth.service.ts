import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/LoginRequest';
import { LoginResponse } from '../models/LoginResponse';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  protected basePath = 'http://demo.oybek.com/oauth/token';

  loginRequestModel: LoginRequest;
  loginResponseModel: LoginResponse;

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return localStorage.getItem('token');
  }

  tokenToString() {
    return `Bearer ${this.getToken()}`;
  }

  login(loginRequestModel: LoginRequest): Observable<LoginResponse> {

    let str = [];
    for (var key in loginRequestModel) {
      if (loginRequestModel.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key) + '=' + encodeURIComponent(loginRequestModel[key]))
        console.log(key + ' -> ' + loginRequestModel[key]);
      }
    }
    let result = str.join('&');

    return this.http.post<LoginResponse>(this.basePath, result);
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
