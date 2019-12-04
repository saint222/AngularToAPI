import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginResponse } from 'src/app/models/LoginResponse';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  isLoading: boolean;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  login() {
    this.isLoading = true;
    const loginRequest = Object.assign({ grant_type: "password" }, this.form.value); //эндпойнт требует хардКод поле (grant_type: "password")
    this.auth.login(loginRequest).subscribe((token: LoginResponse) => {
      console.log(token);
      if (token.access_token) {
        localStorage.setItem('token', token.access_token);
        this.getUserDetails();
        this.isLoading = false;
        this.router.navigate(['']);
      }
    }, (err: HttpErrorResponse) => {
      localStorage.clear();
      this.router.navigate(['/login']);
      return console.log('Problem: ' + err.message, 'Error: ' + err.error);
    });
  }

  getUserDetails() {
    this.auth.getUserDetails().subscribe(resp => {
      if (resp.Success) {
        this.auth.currentUser = resp;
        console.log('CurrentUser: ', this.auth.currentUser);
      }
    },
      (err: HttpErrorResponse) => {
        localStorage.clear();
        this.router.navigate(['/login']);
        return console.log('Problem: ' + err.message, 'Error: ' + err.error);
      });
  }
}
