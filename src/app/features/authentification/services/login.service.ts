import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService, LoginResponse} from '../../../core/auth';
import {Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';

import {environment} from '../../../../environments/environment';
import {RefreshTokenResponse} from '../../../core/auth/models/refresh-token-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {
  }

  login(data: { username: string; password: string }): Observable<unknown> {
    return this.http
      .post<LoginResponse>(`${environment.odata?.prefix}/Utilisateur/login`, data)
      .pipe(
        switchMap((reponse) => LoginResponse.deserialize(reponse)),
        tap((response: {token: string}) => {
          this.auth.login(response.token);
        }),
      );

  }

  logout(): void {
    // Logout
    this.auth.logout();

    this.router.navigate([environment.router.login]);
  }

  refreshToken(): Observable<RefreshTokenResponse> {
    return this.http.get<RefreshTokenResponse>(`${environment.api.prefix}/auth/refreshToken`).pipe(
      switchMap((response) => RefreshTokenResponse.deserialize(response)),
      tap((resp) => {
        this.auth.refreshToken(resp.token);
      })
    );
  }

}
