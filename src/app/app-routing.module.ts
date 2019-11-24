import { Routes, RouterModule } from '@angular/router';
import { NotExistsComponent } from './shared/components/not-exists/not-exists.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { UserComponent } from './components/user/user.component';
import { CreateComponent } from './components/create/create.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    {path: 'contacts', component: ContactsComponent},
    {path: 'users', component: UsersComponent},
    {path: 'users/:id', component: UserComponent},
    {path: 'create', component: CreateComponent},
    { path: '**', component: NotExistsComponent }
  ];

  @NgModule ({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
