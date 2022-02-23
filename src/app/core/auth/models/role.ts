import { IsArray, IsDefined, IsInt, IsString, ValidateNested } from 'class-validator';
import { identifier, list, object, serializable } from 'serializr';

import { Authority } from './authority';

export class Role {
  @serializable(identifier())
  @IsDefined()
  @IsInt()
  id: number;

  @serializable
  @IsDefined()
  @IsString()
  authority: string;

  @serializable
  @IsString()
  name: string;

  @serializable(list(object(Authority)))
  @IsDefined()
  @IsArray()
  @ValidateNested()
  authorities: Authority[];
}
