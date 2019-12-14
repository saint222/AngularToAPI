import { Component, OnInit, Input } from '@angular/core';
import { RegistrationService } from './../../services/registration.service';
import { UserResponse } from 'src/app/models/UserResponse';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomValidators } from '../../shared/validators/custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  newUser: UserResponse;
  isLoading: boolean;
  form: FormGroup;

  constructor(
    private regService: RegistrationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        FirstName: ['', Validators.required],
        LastName: ['', Validators.required],
        Email: ['', [Validators.required, Validators.email]],
        Password: ['', [Validators.required, Validators.minLength(6)]],
        PasswordConfirmation: ['', Validators.required]
      },
      {
        validator: CustomValidators.MustMatch(
          'Password',
          'PasswordConfirmation'
        )
      }
    );
  }

  register(): void | string {
    this.isLoading = true;
    const userRequest = Object.assign({}, this.form.value);
    this.regService.register(userRequest).subscribe(
      (newUser: UserResponse) => {
        console.log('NewUser: ', newUser);
        if (newUser.Success) {
          this.isLoading = false;
          this.router.navigate(['login']);
        }
      },
      (err: HttpErrorResponse) => {
        return console.log('Problem: ' + err.message, 'Error: ' + err.error);
      }
    );
  }
}
