import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CurrentUser } from '../models/currentUser';

@Injectable({ providedIn: 'root' })
export class CurrentUserResolver implements Resolve<CurrentUser> {
    constructor(private auth: AuthService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<CurrentUser> {
        return this.auth.getUserDetails().pipe(
            catchError(error => {
                this.router.navigate(['/forbidden']);
                return of(null);
            })
        );
    }
}