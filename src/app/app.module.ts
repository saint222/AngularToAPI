import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotExistsComponent } from './shared/components/not-exists/not-exists.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './services/auth.service';
import { RegistrationService } from './services/registration.service';
import { SpinnerDirective } from './shared/directives/spinner.directive';
import { ContainerDirective } from './shared/directives/container.directive';
import { UsermanagementService } from './services/usermanagement.service';
import { CreateComponent } from './components/create/create.component';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { PageSetterService } from './services/page-setter.service';
import { HTTPInterceptor } from './shared/interceptors/http.interceptor';
import { ForbiddenComponent } from './shared/components/forbidden/forbidden.component';

const AUTH_INTERCEPTOR: Provider = {
   provide: HTTP_INTERCEPTORS,
   useClass: AuthInterceptor,
   multi: true
};

const HTTP_INTERCEPTOR: Provider = {
   provide: HTTP_INTERCEPTORS,
   useClass: HTTPInterceptor,
   multi: true
};

@NgModule({
   declarations: [
      AppComponent,
      RegisterComponent,
      NotExistsComponent,
      LoginComponent,
      HomeComponent,
      SpinnerDirective,
      ContainerDirective,
      CreateComponent,
      ForbiddenComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule,
      ReactiveFormsModule
   ],
   providers: [
      RegistrationService,
      AuthService,
      UsermanagementService,
      PageSetterService,
      AUTH_INTERCEPTOR,
      HTTP_INTERCEPTOR
   ],
   exports: [
      SpinnerDirective,
      ContainerDirective
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
