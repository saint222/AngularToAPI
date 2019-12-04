import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRequest } from '../models/UserRequest';
import { UserResponse } from '../models/UserResponse';
import { Observable } from 'rxjs';

@Injectable()
export class RegistrationService {

  protected basePath = 'http://demo.oybek.com/api/User/Register';

  userRequest: UserRequest;
  userResponse: UserResponse;

  constructor(private http: HttpClient) {
  }

  register(userRequest: UserRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.basePath, userRequest);
  }

  getDetails(): Observable<UserResponse> {
    const basePath = 'http://demo.oybek.com/api/User/Details';
    return this.http.get<UserResponse>(basePath);
  }
}
