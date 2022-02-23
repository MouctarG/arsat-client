import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '../store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { deserialize } from 'serializr';
import { environment } from '../../../environments/environment';

import { AuthService } from './auth.service';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthoritiesGuard implements CanActivate {

  constructor(
    private store: Store,
    private router: Router,
    private auth: AuthService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const authorities = next.data.authorities;

    return this.store.selectOnce('isAuthenticated').pipe(

      // Check if authenticated
      switchMap((isAuthenticated) => {
        if (!isAuthenticated) {
          this.auth.logout();
          return of(this.router.parseUrl(environment.router.login));
        } else if (!authorities) {
          return of(true);
        } else {

          // Check if user has authorities
          return this.store.selectOnce('user').pipe(
            switchMap((user) => {
              user = deserialize(User, user);
              let hasAuthority = false;

              if (user) {
                for (const authority of authorities) {
                  if (user.hasAuthority(authority)) {
                    hasAuthority = true;
                    break;
                  }
                }
              }

              if (hasAuthority) {
                return of(true);
              } else {
                this.auth.logout();
                return of(this.router.parseUrl(environment.router.login));
              }
            })
          );
        }
      })
    );

  }

}
