import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserModel } from 'src/app/models/userModel';
import { UsermanagementService } from './../../services/usermanagement.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  isDeleted: boolean;
  public users: Array<UserModel> = [];
  public user: UserModel;

  constructor(private route: ActivatedRoute,
    private userManServ: UsermanagementService) { }


  deleteUser(id: number) {                              // id берется из шаблона: (click) = "deleteUser(user.UserId)"
    this.isDeleted = false;
    this.userManServ.deleteUser(id).subscribe(p => {
      if (p.Success) {
        // localStorage.removeItem('usersArray');
        this.isDeleted = true;
      }
    },
      (err: HttpErrorResponse) => {
        return console.log('Problem: ' + err.message, 'Error: ' + err.error);
      });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.userManServ.getUserById().subscribe(response => {
        this.users = response.Data;
        this.user = this.users.find(p => p.UserId == params.id );
      });
    });
  }
}

