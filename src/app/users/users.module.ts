import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        UsersComponent,
        UserComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild
        ([
            {path: '', component: UsersComponent},
            { path: ':id', component: UserComponent}
        ]),
        NgbModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        RouterModule
    ]
})

export class UsersModule {

}

// {path: 'users/:id', component: UserComponent}