import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateResourceDto {
  id?: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  path: string;

  resource_parent?: number | any;
}

export class UpdateResourceDto extends PartialType(CreateResourceDto) {}
