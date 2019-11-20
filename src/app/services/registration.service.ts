import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userRequest } from './../models/userRequest';
import { userResponse } from '../models/userResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  protected basePath = 'http://demo.oybek.com/api/User/Register';

  @Input() userRequest: userRequest;
  @Input() userResponse: userResponse;

  constructor(private http: HttpClient) {
  }

  register(userRequest: userRequest): Observable<userResponse> {
    return this.http.post<userResponse>(this.basePath, userRequest);
  }
}
