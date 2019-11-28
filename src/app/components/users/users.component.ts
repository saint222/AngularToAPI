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

  constructor(private userManag: UsermanagementService,
    private router: Router) {

  }
  
  public isLoading: boolean;
  public users: Array<UserModel> = [];

  goToCreate() {
    this.router.navigate(['/create']);
  }

  ngOnInit() {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['login']);
      return;
    } else {
      this.userManag.getUsers(1).subscribe(response => {
        setTimeout(() => {
          this.users = response.Data;
          console.log('Users: ', this.users);
          // localStorage.setItem('usersArray', JSON.stringify(this.users))
          this.isLoading = false;         
        }, 1000);
      },
        (err: HttpErrorResponse) => {
          return console.log('Problem: ' + err.message, 'Error: ' + err.error);
        });
    }
  }

}
