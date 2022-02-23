import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '../store';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private auth: AuthService, private store: Store) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (req.url.indexOf(environment.api.prefix) !== -1) {

      // Check if there is a token
      const authReq = !this.store.selectSnapshot('accessToken') ? req : req.clone({
        headers: req.headers.set('Authorization', `Bearer ${this.store.selectSnapshot('accessToken')}`)
      });

      return next.handle(authReq).pipe(tap(() => { },
        (error) => {
          if ((error instanceof HttpErrorResponse) && (error.status === 401)) {

            // Disconnect with the Auth service
            this.router.navigate([environment.router.logout]);

          }

        }));

    } else {
      return next.handle(req);
    }

  }

}
