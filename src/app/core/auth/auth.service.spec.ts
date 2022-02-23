import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Store } from '@core/store';

describe('AuthService', () => {
  let service: AuthService;
  let store: Store;

  beforeEach(() => {

    // Clear Local Storage
    localStorage.clear();

    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should store token on login and remove it on logout', () => {

  //   const token = 'FAKE_TOKEN';

  //   service.login(token);

  //   expect(store.selectSnapshot('accessToken')).toBe(token);
  //   expect(store.selectSnapshot('isAuthenticated')).toBe(true);

  //   service.logout();

  //   expect(store.selectSnapshot('accessToken')).toBe(null);
  //   expect(store.selectSnapshot('isAuthenticated')).toBe(false);
  // });
});
