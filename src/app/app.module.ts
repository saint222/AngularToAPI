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
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/user/user.component';
import { CreateComponent } from './components/create/create.component';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageSetterService } from './services/page-setter.service';

const AUTH_INTERCEPTOR: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
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
    UsersComponent,
    UserComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    RegistrationService,
    AuthService,
    UsermanagementService,
    AUTH_INTERCEPTOR,
    PageSetterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
