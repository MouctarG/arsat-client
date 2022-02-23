import { Injectable } from '@angular/core';
import { User } from '../auth';
import { Store } from '../store';
import { deserialize } from 'serializr';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(
    private store: Store
  ) { }


  getCurrentUser(): User {
    return deserialize(User, this.store.selectSnapshot('user'));
  }

  /**
   * Vérifie si l'utilisateur dispose du droit passé en paramètre.
   */
  hasAuthority(authority: string): boolean {
    const user = this.getCurrentUser();

    if (user) {
      return user.hasAuthority(authority);
    } else {
      return false;
    }
  }
}
