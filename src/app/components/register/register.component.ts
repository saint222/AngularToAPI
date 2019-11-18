import { Component, OnInit, Input } from '@angular/core';
import { RegistrationService } from './../../services/registration.service';
import { userResponse } from 'src/app/models/userResponse';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { userRequest } from 'src/app/models/userRequest';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Input() newUser: userResponse;
  @Input() userRequest: userRequest;

  form: FormGroup;

  constructor(private regService: RegistrationService,
    private router: Router) { }



  ngOnInit() {
    this.form = new FormGroup({
      FirstName: new FormControl(''),
      LastName: new FormControl(''),
      Email: new FormControl(''),
      Password: new FormControl(''),
      PasswordConfirmation: new FormControl('')
    })
  }


  register() {
    const userRequest = Object.assign({}, this.form.value);
    this.regService.register(userRequest).subscribe((newUser: userResponse) => {
      console.log(newUser);
      if (newUser.Success) {
        this.router.navigate(['login'])
      }
    },
      (err: HttpErrorResponse) => {
        return console.log(err.error);
      });
  }

}
