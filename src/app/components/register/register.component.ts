import { Component, OnInit, Input } from '@angular/core';
import { RegistrationService } from './../../services/registration.service';
import { userResponse } from 'src/app/models/userResponse';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomValidators } from './../../shared/custom-validators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Input() newUser: userResponse;

  form: FormGroup;

  constructor(
    private regService: RegistrationService,
    private router: Router,
    private formBuilder: FormBuilder
             ) { }

  ngOnInit() {
    // this.form = new FormGroup({
    //   FirstName: new FormControl('', [Validators.required]),
    //   LastName: new FormControl('', [Validators.required]),
    //   Email: new FormControl('', [Validators.required, Validators.email]),
    //   Password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    //   PasswordConfirmation: new FormControl('', [Validators.required])

      this.form = this.formBuilder.group({
        FirstName: ['', Validators.required],
        LastName: ['', Validators.required],
        Email: ['', [Validators.required, Validators.email]],
        Password: ['', [Validators.required, Validators.minLength(6)]],
        PasswordConfirmation: ['', Validators.required]
    }, {
        validator: CustomValidators.MustMatch('Password', 'PasswordConfirmation')
    });
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
        return console.log('Problem: ' + err.message, err.error);
      });
  }

}
