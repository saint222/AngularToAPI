import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CurrentUser } from 'src/app/models/currentUser';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  currentUser: CurrentUser;

  constructor(private router: Router, public auth: AuthService) { }

  ngOnInit() {
    if (!this.isAuthorized) {
      this.router.navigate(['login']);
    }

    this.auth.currentUser$.subscribe(next => this.currentUser = next);
  }

  logOut(): void {
    this.auth.logOut();
    this.router.navigate(['login']);
  }

  get isAuthorized(): boolean {
    return this.auth.isAuthorised();
  }

  get isAdmin(): boolean {
    if (this.currentUser) {
      return this.currentUser.Data.Role === 'Admin';
    }
    return false;
  }

  get getName() {
    if (this.currentUser) {
      return this.currentUser.Data.FirstName;
    }
  }

  get isInitialized(): boolean {
    return this.currentUser !== null;
  }

}
