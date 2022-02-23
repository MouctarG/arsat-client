import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {State, stateDefaults} from './state';
import {first, pluck} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Store {

  private store = new ReplaySubject<State>(1);
  private state = stateDefaults;

  constructor() {
    this.notify();
  }

  /**
   * Ecouter une propriété continuellement
   */
  select<T extends keyof State>(property: T): Observable<State[T]> {
    return this.store.pipe(
      pluck(property)
    );
  }

  /**
   * Récupérer une propriété de façon **asynchrone**
   *
   * exemple:
   * ```ts
   * this.store.selectOnce('property');
   * ```
   */
  selectOnce<T extends keyof State>(property: T): Observable<State[T]> {

    return this.select(property).pipe(
      first()
    );

  }

  /**
   * Récupérer une propriété de façon **synchrone**
   */
  selectSnapshot<T extends keyof State>(property: T): State[T] {
    return this.state[property];
  }

  dispatch(partialState: Partial<State>): void {

    try {

      const flatPartialState = JSON.parse(JSON.stringify(partialState));

      this.state = {...this.state, ...flatPartialState};

      this.notify();

    } catch {
    }

  }

  private notify(): void {
    this.store.next(this.state);
  }

}
