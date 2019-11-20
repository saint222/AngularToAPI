import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { NotExistsComponent } from './shared/not-exists/not-exists.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './services/auth.service';
import { RegistrationService } from './services/registration.service';



@NgModule({
   declarations: [
      AppComponent,
      RegisterComponent,
      NotExistsComponent,
      LoginComponent, HomeComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule,
      ReactiveFormsModule
   ],
   providers: [RegistrationService, AuthService],
   bootstrap: [AppComponent]
})
export class AppModule {

}
