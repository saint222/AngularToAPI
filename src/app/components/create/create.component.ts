import { Component, OnInit } from '@angular/core';
import { UsermanagementService } from 'src/app/services/usermanagement.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  constructor(
    private usManServ: UsermanagementService,
    private route: Router
  ) {}

  createUser() {
    this.usManServ
      .createUser({
        Password: 'Welcome20!9',
        Email: 'sammy@gmail.com',
        FirstName: 'Sammy',
        LastName: 'Sammuel',
        Role: 'Admin'
      })
      .subscribe(x => {
        console.log(x.Data.UserId);
      });
    localStorage.removeItem('usersArray');
    this.route.navigate(['users']);
  }

  ngOnInit() {}
}
