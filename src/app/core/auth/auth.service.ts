import {Injectable} from '@angular/core';
import {Store} from '../store';
import {deserialize, serialize} from 'serializr';
import {User} from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly tokenKey = 'access_token';
  readonly userKey = 'user';

  constructor(
    private store: Store
  ) {

    const token = localStorage.getItem(this.tokenKey);
    const userJson = localStorage.getItem(this.userKey);

    let user: User | null = null;
    if (userJson) {
      user = serialize(deserialize(User, JSON.parse(userJson)));
    }

    this.store.dispatch({
      accessToken: token,
      user,
      isAuthenticated: !!token
    });

  }

  login(token: string): void {
    localStorage.setItem(this.tokenKey, token);

    this.store.dispatch({
      accessToken: token,
      isAuthenticated: true
    });
  }

  setUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(serialize(user)));

    this.store.dispatch({
      user: serialize(user)
    });
  }

  logout(): void {

    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);

    this.store.dispatch({
      accessToken: null,
      user: null,
      isAuthenticated: false
    });
  }

  refreshToken(token: string): void {

    localStorage.setItem(this.tokenKey, token);

    this.store.dispatch({
      accessToken: token
    });
  }

}
