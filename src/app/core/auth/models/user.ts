import {IsArray, IsBoolean, IsDate, IsDefined, IsInt, IsOptional, IsString, validate, ValidateNested, ValidationError,} from 'class-validator';
import {from, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {deserialize, identifier, list, object, serializable} from 'serializr';

import {Role} from './role';

export class User {

  @serializable(identifier())
  @IsDefined()
  @IsInt()
  id: number;

  @serializable
  @IsDefined()
  @IsString()
  username: string;

  @serializable
  @IsOptional()
  @IsString()
  firstname: string;

  @serializable
  @IsOptional()
  @IsString()
  email?: string;

  @serializable
  @IsOptional()
  @IsString()
  lastname: string;

  @serializable
  @IsDefined()
  @IsBoolean()
  enabled: boolean;

  @serializable
  @IsOptional()
  @IsDate()
  expirationDate: Date;

  @serializable
  @IsDefined()
  @IsBoolean()
  locked: boolean;

  @serializable
  @IsOptional()
  @IsDate()
  credentialsExpirationDate: Date;

  @serializable(list(object(Role)))
  @IsDefined()
  @IsArray()
  @ValidateNested()
  roles: Role[];

  public static hasAuthority(user: User, authorityName: string): boolean {
    return user.roles.some(role => role.authority === authorityName || role.authorities.some(a => authorityName === a.authority));
  }

  public static deserialize(data: object | undefined, validation = true): Observable<User> {
    const instance = deserialize<User>(User, data);

    if (validation) {
      return instance.validate();
    } else {
      return of<User>(instance);
    }
  }

  public validate(): Observable<User> {
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

  /**
   * Vérifie si l'utilisateur dispose du rôle passé en paramètre.
   * Si le rôle est composé de plusieurs niveaux (n1.n2.n3), l'utilisateur doit avoir les droits sur l'ensemble des niveaux.
   */
  // hasRole(role: string): boolean {
  //   if (this.paramProfil[role] && this.paramProfil[role].booleanValeur) {
  //     const levels = role.split('.');
  //     if (levels.length > 1) {
  //       levels.pop();
  //       return this.hasRole(levels.join('.'));
  //     }

  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  hasAuthority(authorityName: string): boolean {
    return this.roles.some(role => role.authority === authorityName || role.authorities.some(a => authorityName === a.authority));
    // return this.authorities.some(a => authorityName === a.authority) ? true : false;
  }
}
