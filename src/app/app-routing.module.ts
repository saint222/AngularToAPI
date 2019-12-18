import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NotExistsComponent } from './shared/components/not-exists/not-exists.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CreateComponent } from './components/create/create.component';
import { ForbiddenComponent } from './shared/components/forbidden/forbidden.component';
import { CurrentUserResolver } from './resolvers/current-user.resolver';

const routes: Routes = [
    {path: '', component: HomeComponent, pathMatch: 'full', runGuardsAndResolvers: 'always', resolve: { currentUser: CurrentUserResolver }},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'users', loadChildren: './users/users.module#UsersModule', runGuardsAndResolvers: 'always', resolve: { currentUser: CurrentUserResolver }},  //LazyLoading
    {path: 'create', component: CreateComponent, runGuardsAndResolvers: 'always', resolve: { currentUser: CurrentUserResolver }},
    {path: 'forbidden', component: ForbiddenComponent},
    {path: '**', component: NotExistsComponent}
  ];

  @NgModule ({
    imports: [RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules         //loading strategy
    })],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
