import {IsDefined, IsString, validate, ValidationError} from 'class-validator';
import {from, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {deserialize, serializable} from 'serializr';

export class LoginResponse {
  @serializable
  @IsDefined()
  @IsString()
  token: string;

  public static deserialize(data: object | undefined, validation = true): Observable<LoginResponse> {
    const instance = deserialize<LoginResponse>(LoginResponse, data);

    if (validation) {
      return instance.validate();
    } else {
      return of<LoginResponse>(instance);
    }
  }

  public validate(): Observable<LoginResponse> {
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
