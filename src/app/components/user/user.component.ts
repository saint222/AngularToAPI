import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserModel } from 'src/app/models/userModel';
import { UsermanagementService } from './../../services/usermanagement.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  isEdited: boolean;
  isToggled: boolean;
  isDeleted: boolean;
  public users: Array<UserModel> = [];
  public user: UserModel;
  public currentPage: number;
  public collectionSize: number;
  form: FormGroup;
  passPattern = '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).{6,}$';

  constructor(private route: ActivatedRoute,
    private userManServ: UsermanagementService,
    private formBuilder: FormBuilder,
    private usManServ: UsermanagementService) 
    { 
      this.route.params.subscribe((params: Params) => {
        this.userManServ.getUserById(this.currentPage).subscribe(response => {
          this.users = response.Data;
          console.log('Users: ', this.users)
          this.currentPage = response.PageInfo.CurrentPage;
          this.collectionSize = response.PageInfo.TotalPages * 30;
          this.user = this.users.find(p => p.UserId == params.id );
          console.log('User: ', this.user)
        });
      });    
    }
 

  deleteUser(id: number) {                              // id берется из шаблона: (click) = "deleteUser(user.UserId)"
    this.isDeleted = false;
    this.userManServ.deleteUser(id).subscribe(p => {
      if (p.Success) {        
        this.isDeleted = true;
      }
    },
      (err: HttpErrorResponse) => {
        return console.log('Problem: ' + err.message, 'Error: ' + err.error);
      });
  }

  changeToggle(){
    this.isToggled = true; 
  }

  editUser(){
    this.isEdited = false;
    const userRequest = Object.assign({}, this.form.value);    
    userRequest['Role'] = userRequest['Role'] ? 'Admin' : 'User';                        // Обработка Тру/Фолс из чекбокса
    userRequest['UserId'] = this.user.UserId;
    console.log(userRequest)
    this.usManServ.updateUser(userRequest)
      .subscribe(x => {
        if (x.Success){
          console.log(x.Data.UserId, x.Success);   
          this.isEdited = true;               
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

