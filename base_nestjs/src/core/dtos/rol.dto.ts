import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateRolDto {
  id?: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateRolDto extends PartialType(CreateRolDto) {}
