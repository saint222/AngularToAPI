import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isAuthorised: boolean; // = true

  constructor(private router: Router, private auth: AuthService) {
// this.isAuthorised = this.updateComponent();
  }

  logOut() {
    this.auth.logOut();
    this.isAuthorised = true;
    this.router.navigate(['login']);
  }

  updateComponent() {
    if (this.auth.isAuthorised()) {
      return  this.isAuthorised = true;
    } else {
      return this.isAuthorised = false;
    }
  }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.isAuthorised = true;
      this.router.navigate(['login']);
    }
  }
}
