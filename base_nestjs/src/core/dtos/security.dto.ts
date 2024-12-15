import { IsArray } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class SecurityDto {
  @IsArray()
  resources: Array<number>;

  @IsArray()
  permissions: Array<number>;
}

export class UpdateSecurityDto extends PartialType(SecurityDto) {}
