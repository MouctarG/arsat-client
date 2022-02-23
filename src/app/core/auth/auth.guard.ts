import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Store} from '../store';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {environment} from '../../../environments/environment';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private store: Store,
    private router: Router,
    private auth: AuthService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.store.selectOnce('isAuthenticated').pipe(
      switchMap((isAuthenticated) => {
        if (isAuthenticated) {
          return of(true);
        }

        this.auth.logout();
        return of(this.router.parseUrl(environment.router.login));
      })
    );

  }

}
