import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(private router: Router, private auth: AuthService) {
  }

  logOut() {
    this.auth.logOut();
    this.router.navigate(['login']);
  }

  ngOnInit() {
    if (!this.isAuthorized) {
      this.router.navigate(['login']);
    }    
  }

  get isAuthorized() {
    return this.auth.isAuthorised();
  }
}
