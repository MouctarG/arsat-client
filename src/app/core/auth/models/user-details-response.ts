import {IsDefined, validate, ValidateNested, ValidationError} from 'class-validator';
import {from, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {deserialize, object, serializable} from 'serializr';

import {User} from './user';

export class UserDetailsResponse {
  @serializable(object(User))
  @IsDefined()
  @ValidateNested()
  user: User;

  public static deserialize(data: object | undefined, validation = true): Observable<UserDetailsResponse> {
    const instance = deserialize<UserDetailsResponse>(UserDetailsResponse, data);

    if (validation) {
      return instance.validate();
    } else {
      return of<UserDetailsResponse>(instance);
    }
  }

  public validate(): Observable<UserDetailsResponse> {
    return from(validate(this)).pipe(
      map((errors: ValidationError[]) => {
        if (errors.length > 0) {
          throw errors;
        } else {
          return this;
        }
      })
    );
  }
}
