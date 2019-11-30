import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserModel } from './../../models/userModel';
import { UsermanagementService } from './../../services/usermanagement.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public isLoading: boolean;
  public users: Array<UserModel> = [];
  public currentPage: number;
  public collectionSize: number;

  constructor(
    private userManag: UsermanagementService,
    private router: Router
  ) {}

  goToCreate() {
    this.router.navigate(['/create']);
  }

  ngOnInit() {
    this.isLoading = true;
    this.userManag.getUsers().subscribe(
      response => {
        this.users = response.Data;
        console.log('Users: ', this.users);
        this.currentPage = response.PageInfo.CurrentPage;
        this.collectionSize = response.PageInfo.TotalPages * 30;
        // localStorage.setItem('usersArray', JSON.stringify(this.users))
        this.isLoading = false;
      },
      (err: HttpErrorResponse) => {
        return console.log('Problem: ' + err.message, 'Error: ' + err.error);
      }
    );
  }

  onPageChange() {
    this.isLoading = true;
    this.userManag.getUsers(this.currentPage).subscribe(
      response => {
        this.users = response.Data;
        console.log('Users: ', this.users);
        this.currentPage = response.PageInfo.CurrentPage;
        this.collectionSize = response.PageInfo.TotalPages * 30;
        this.isLoading = false;
      },
      (err: HttpErrorResponse) => {
        return console.log('Problem: ' + err.message, 'Error: ' + err.error);
      }
    );
  }
}
