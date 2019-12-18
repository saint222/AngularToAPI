import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/UserModel';
import { UsermanagementService } from '../../services/usermanagement.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { PageSetterService } from '../../services/page-setter.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  
  isLoading: boolean;
  users: Array<UserModel> = [];
  currentPage: number;
  collectionSize: number;

  constructor
  (
    private route: ActivatedRoute,
    private auth: AuthService,
    private userManag: UsermanagementService,
    private pageSetterService: PageSetterService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;

    this.route.data.subscribe(data => {
      const currentUser = data['currentUser'];
      this.auth.currentUser$.next(currentUser);
    });

    this.userManag.getUsers().subscribe(
      response => {
        this.users = response.Data;
        console.log('Users: ', this.users);        
        this.collectionSize = response.PageInfo.TotalPages * 30;  
        this.currentPage = response.PageInfo.CurrentPage;      
        this.pageSetterService.setPage = this.currentPage;
        this.isLoading = false;
      },
      (err: HttpErrorResponse) => {
        return console.log('Problem: ' + err.message, 'Error: ' + err.error);
      }
    );
  }

  goToCreate() {
    this.router.navigate(['/create']);
  }  

onPageChange() {
    this.isLoading = true;
    this.userManag.getUsers(this.currentPage).subscribe(
      response => {
        this.users = response.Data;
        console.log('Users: ', this.users);        
        this.collectionSize = response.PageInfo.TotalPages * 30;
        this.currentPage = response.PageInfo.CurrentPage;
        this.pageSetterService.setPage = this.currentPage;
        this.isLoading = false;
      },
      (err: HttpErrorResponse) => {
        return console.log('Problem: ' + err.message, 'Error: ' + err.error);
      }
    );
  }  
}
