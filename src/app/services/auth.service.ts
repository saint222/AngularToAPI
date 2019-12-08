import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/LoginRequest';
import { LoginResponse } from '../models/LoginResponse';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CurrentUser } from '../models/currentUser';

@Injectable()

export class AuthService {

  protected basePath = 'http://demo.oybek.com/oauth/token';

  loginRequestModel: LoginRequest;
  loginResponseModel: LoginResponse;
  currentUser: CurrentUser;

  constructor(private http: HttpClient, private router: Router) { }

  isAuthorised() {
    return !!sessionStorage.getItem('token');
  }

  getToken() {
    return sessionStorage.getItem('token');
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

  logOut() {
    sessionStorage.clear(); 
    this.router.navigate(['/login'])
  } 

  getUserDetails(): Observable<CurrentUser> {
    const basePath = 'http://demo.oybek.com/api/User/Details';
    return this.http.get<CurrentUser>(basePath);
  }   
}
// Эндпойнт ождает стрингу вида: username=SOMETHING&password=SOMETHING&grant_type=password
