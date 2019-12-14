import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/UserModel';
import { Observable } from 'rxjs';
import { ListViewModel } from '../models/ListViewModel';
import { ExtendedUserModel } from '../models/ExtendedUserModel';
import { UserResponse } from '../models/UserResponse';
import { DeleteResponseModel } from '../models/DeleteResponseModel';

@Injectable()
export class UsermanagementService {

  constructor(private http: HttpClient) { }

  getToken(): string {
    return sessionStorage.getItem('token');
  }

  tokenToString(): string {
    return `Bearer ${this.getToken()}`;
  }


  getUserById(pageNumber?: number): Observable<ListViewModel<UserModel>> {
    if (typeof pageNumber !== 'number' || pageNumber != pageNumber || pageNumber <= 0) {
      pageNumber = 1;
    }
    const basePath = `http://demo.oybek.com/api/UserManagement?pageNumber=${pageNumber}`;
    return this.http.get<ListViewModel<UserModel>>(basePath);
  }


  getUsers(pageNumber?: number): Observable<ListViewModel<UserModel>> {
    if (typeof pageNumber !== 'number' || pageNumber != pageNumber || pageNumber <= 0) {
      pageNumber = 1;
    }
    const basePath = `http://demo.oybek.com/api/UserManagement?pageNumber=${pageNumber}`;
    return this.http.get<ListViewModel<UserModel>>(basePath);
  }

  createUser(userRequest: ExtendedUserModel): Observable<UserResponse> {

    const basePath = 'http://demo.oybek.com/api/UserManagement';
    return this.http.post<UserResponse>(basePath, userRequest);
  }

  updateUser(userRequest: ExtendedUserModel): Observable<UserResponse> {

    const basePath = 'http://demo.oybek.com/api/UserManagement';
    return this.http.post<UserResponse>(basePath, userRequest);
  }

  deleteUser(id: number): Observable<DeleteResponseModel> {
    const basePath = `http://demo.oybek.com/api/UserManagement?userId=${id}`;
    return this.http.delete<DeleteResponseModel>(basePath);
  }

}

