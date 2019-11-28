import { Component, OnInit } from '@angular/core';
import { UsermanagementService } from 'src/app/services/usermanagement.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

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

  constructor(
    private usManServ: UsermanagementService,
    private route: Router,
    private formBuilder: FormBuilder
  ) {}

  

  createUser() {
    this.isCreated = false;
    const userRequest = Object.assign({}, this.form.value);
    
    userRequest['Role'] = userRequest['Role'] ? 'Admin' : 'User'; // Обработка Тру/Фолс из чекбокса
    this.usManServ.createUser(userRequest)
      .subscribe(x => {
        if (x.Success){
          console.log(x.Data.UserId, x.Success);
          localStorage.removeItem('usersArray');
          this.isCreated = true;
    // this.route.navigate(['users']);
        }                
      },
      (err: HttpErrorResponse) => {
        return console.log('Problem: ' + err.message, 'Error: ' + err.error);
      });          
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.pattern(this.passPattern)]],        //Validators.minLength(6)
      Role: ['false']                                                                     // дефолтное значение == 'User'
  });
  }
}
