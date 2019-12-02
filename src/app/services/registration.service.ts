import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRequest } from '../models/UserRequest';
import { UserResponse } from '../models/UserResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  protected basePath = 'http://demo.oybek.com/api/User/Register';

  @Input() userRequest: UserRequest;
  @Input() userResponse: UserResponse;

  constructor(private http: HttpClient) {
  }

  register(userRequest: UserRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.basePath, userRequest);
  }
}
