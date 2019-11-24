import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserModel } from 'src/app/models/userModel';
import { UsermanagementService } from './../../services/usermanagement.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {


  constructor(private route: ActivatedRoute, 
              private userManServ: UsermanagementService) { }

  //@Input() users: Array<UserModel>;
  public user: UserModel;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.log('Params:', params)
     this.user = this.userManServ.getById(parseInt(params.id))
     console.log('User:', this.user)
    })
  }

}
