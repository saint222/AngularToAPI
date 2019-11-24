import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './../models/userModel';
import { Observable } from 'rxjs';
import { ListViewModel } from './../models/listViewModel';
import { ExtendedUserModel } from '../models/extendedUserModel';
import { userResponse } from '../models/userResponse';

@Injectable({
  providedIn: 'root'
})
export class UsermanagementService {

  constructor(private http: HttpClient) { }

  getToken() {
    return localStorage.getItem('token');
  }

  tokenToString() {
    return `Bearer ${this.getToken()}`;
  }

  getUsers(pageNumber: number): Observable<ListViewModel<UserModel>> {
    if (typeof pageNumber !== 'number' || pageNumber != pageNumber || pageNumber <= 0) {
      pageNumber = 1;
    }
    const basePath = `http://demo.oybek.com/api/UserManagement?pageNumber=${pageNumber}`;
    return this.http.get<ListViewModel<UserModel>>(basePath, {
      headers: {
        Authorization: this.tokenToString()
      }
    });
  }

  getById(id: number) {
    const users = JSON.parse(localStorage.getItem('usersArray'));
    console.log(users);
    return users.find(p => p.UserId == id);
  }

  createUser(userRequest: ExtendedUserModel): Observable<userResponse> {
    const basePath = 'http://demo.oybek.com/api/UserManagement';
    return this.http.post<userResponse>(basePath, userRequest, {headers: {
      Authorization: this.tokenToString()
    }});
  }
}
