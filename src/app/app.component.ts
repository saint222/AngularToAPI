import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  isAuthorised: boolean = true;

  constructor(private router: Router, private auth: AuthService) {
    if (!localStorage.getItem('token'))
    {
      this.isAuthorised = false;
      this.router.navigate(['login']);
    }
  }

  logOut (){
    this.auth.logOut();  
    this.router.navigate(['login']);
  }

  ngOnInit() {
    
  }
}
