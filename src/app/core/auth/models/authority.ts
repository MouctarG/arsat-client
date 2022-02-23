import { IsDefined, IsInt, IsString } from 'class-validator';
import { identifier, serializable } from 'serializr';

export class Authority {

  @serializable(identifier())
  @IsDefined()
  @IsInt()
  id: number;

  @serializable
  @IsDefined()
  @IsString()
  authority: string;
}
