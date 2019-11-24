import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { NotExistsComponent } from './shared/components/not-exists/not-exists.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './services/auth.service';
import { RegistrationService } from './services/registration.service';
import { SpinnerDirective } from './shared/directives/spinner.directive';
import { ContainerDirective } from './shared/directives/container.directive';
import { UsermanagementService } from './services/usermanagement.service';
import { UsersComponent } from './components/users/users.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { UserComponent } from './components/user/user.component';
import { CreateComponent } from './components/create/create.component';




@NgModule({
   declarations: [
      AppComponent,
      RegisterComponent,
      NotExistsComponent,
      LoginComponent,
      HomeComponent,
      SpinnerDirective,
      ContainerDirective,
      UsersComponent,
      ContactsComponent,
      UserComponent,
      CreateComponent
   ],
   imports: [
   BrowserModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule,
      ReactiveFormsModule
   ],
   providers: [RegistrationService, AuthService, UsermanagementService],
   bootstrap: [AppComponent]
})
export class AppModule {

}
