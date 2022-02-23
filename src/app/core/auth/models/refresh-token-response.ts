import {IsDefined, IsString, validate, ValidationError} from 'class-validator';
import {from, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {deserialize, serializable} from 'serializr';

export class RefreshTokenResponse {
  @serializable
  @IsDefined()
  @IsString()
  token: string;

  public static deserialize(data: object | undefined, validation = true): Observable<RefreshTokenResponse> {
    const instance = deserialize<RefreshTokenResponse>(RefreshTokenResponse, data);

    if (validation) {
      return instance.validate();
    } else {
      return of<RefreshTokenResponse>(instance);
    }
  }

  public validate(): Observable<RefreshTokenResponse> {
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
