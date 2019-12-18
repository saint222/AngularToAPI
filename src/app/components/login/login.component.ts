import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginResponse } from 'src/app/models/LoginResponse';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrentUser } from 'src/app/models/currentUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  isLoading: boolean;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  login(): void | string {
    this.isLoading = true;
    const loginRequest = Object.assign({ grant_type: "password" }, this.form.value); //эндпойнт требует хардКод поле (grant_type: "password")
    this.auth.login(loginRequest).subscribe((token: LoginResponse) => {
      console.log('Token: ', token);
        sessionStorage.setItem('token', token.access_token);
        this.router.navigate(['/users']);
    }, (err: HttpErrorResponse) => {
      sessionStorage.clear();
      this.router.navigate(['/login']);
      return console.log('Problem: ' + err.message, 'Error: ' + err.error);
    });
  }

  getUserDetails(): Observable<CurrentUser> {
    return new Observable(s => {
      this.auth.getUserDetails().subscribe(resp => {
        if (resp.Success) {
          this.auth.currentUser = resp;
          s.next(resp);
        } else {
          s.error("Unsuccessful response");
        }
      },
        (err: HttpErrorResponse) => {
          s.error('Error: ' + err.error);
        });
    });
  }
}
