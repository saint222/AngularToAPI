import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HTTPInterceptor implements HttpInterceptor {

    constructor(private router: Router) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                console.log('HttpInterceptorError: ', error);
                if (error.status === 403) {
                    this.router.navigate(['forbidden']);
                }
                return throwError(error);
            })
        )
    }
} 