import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserModel } from 'src/app/models/userModel';
import { UsermanagementService } from './../../services/usermanagement.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {


  constructor(private route: ActivatedRoute,
    private userManServ: UsermanagementService,
    private router: Router) { }

  //@Input() users: Array<UserModel>;
  public user: UserModel;

  deleteUser(id: number) {                              // id берется из шаблона: (click) = "deleteUser(user.UserId)"
    this.userManServ.deleteUser(id).subscribe(x => {
      if(x.Success){
        localStorage.removeItem('usersArray');
        this.router.navigate(['users']);
      }
    },
    (err: HttpErrorResponse) => {
      return console.log('Problem: ' + err.message, 'Error: ' + err.error);
    })    
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.log('Params:', params)
      this.user = this.userManServ.getById(parseInt(params.id))
      console.log('User:', this.user)
    })
  }
}
