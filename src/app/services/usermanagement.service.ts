import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserModel } from './../models/userModel';
import { Observable } from 'rxjs';
import { ListViewModel } from './../models/listViewModel';

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
    // const basePath = `http://demo.oybek.com/api/UserManagement`;
    return this.http.get<ListViewModel<UserModel>>(basePath, {
      headers: {
        Authorization: this.tokenToString()}
      });
  }
}
