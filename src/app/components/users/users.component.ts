import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from './../../models/userModel';
import { UsermanagementService } from './../../services/usermanagement.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ListViewModel } from 'src/app/models/listViewModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users: Array<UserModel> = [];

  constructor(private userManag: UsermanagementService,
    private router: Router) {

    }


  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['login']);
      return;
    } else {
      this.userManag.getUsers(1).subscribe(response => {
        this.users = response.Data;
        console.log(this.users);
      },
        (err: HttpErrorResponse) => {
          return console.log('Problem: ' + err.message, 'Error: ' + err.error);
        });
    }
    }

}
