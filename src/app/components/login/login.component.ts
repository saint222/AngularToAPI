import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { loginResponse } from 'src/app/models/loginResponse';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() token: loginResponse;

  form: FormGroup;
  isLoading: boolean;

  constructor(private auth: AuthService, private router: Router) { } 
  

  login() {
    this.isLoading = true;
    const loginRequest = Object.assign({ grant_type: "password" }, this.form.value); //эндпойнт требует хардКод поле (grant_type: "password")    
    this.auth.login(loginRequest).subscribe((token: loginResponse) => {
      console.log(token);
      if (token.access_token) {
        localStorage.setItem('token', token.access_token)
        //localStorage.removeItem('token')
        this.router.navigate([''])        
      }
    },
      (err: HttpErrorResponse) => {
        return console.log('Problem: ' + err.message, 'Error: ' + err.error);
      });
      this.isLoading = false;
  }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl ('', [Validators.required])
    })
  }

}
