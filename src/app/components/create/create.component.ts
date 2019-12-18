import { Component, OnInit } from '@angular/core';
import { UsermanagementService } from 'src/app/services/usermanagement.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  form: FormGroup;
  isCreated: boolean;
  // passPattern: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,}$/;         // ВАРИАНТ с RexExp
  passPattern = '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).{6,}$';

  constructor
    (
      private route: ActivatedRoute,
      private auth: AuthService,
      private usManServ: UsermanagementService,
      private formBuilder: FormBuilder,
      private router: Router
    ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.auth.currentUser = data['currentUser'];
    });

    this.form = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.pattern(this.passPattern)]],        //Validators.minLength(6)
      Role: ['false']                                                                     // дефолтное значение == 'User'
    });
  }

  createUser() {
    this.isCreated = false;
    const userRequest = Object.assign({}, this.form.value);
    userRequest['Role'] = userRequest['Role'] ? 'Admin' : 'User'; // Обработка Тру/Фолс из чекбокса
    this.usManServ.createUser(userRequest)
      .subscribe(resp => {
        if (resp.Success) {
          console.log(resp.Data.UserId, resp.Success);
          this.isCreated = true;
        }
      },
        (err: HttpErrorResponse) => {
          this.router.navigate(['/register']);
          return console.log('Problem: ' + err.message, 'Error: ' + err.error);
        });
  }
}
