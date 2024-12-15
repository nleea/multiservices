import { Mapper, PermissionEntity, CreatePermissionDto } from '../../core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PermissionMapper extends Mapper<
  CreatePermissionDto,
  PermissionEntity
> {
  public mapFrom(data: CreatePermissionDto): PermissionEntity {
    const permission = new PermissionEntity();

    permission.name = data.name;
    permission.path = data.path;
    permission.method = data.path;

    return permission;
  }

  public mapTo(data: PermissionEntity): CreatePermissionDto {
    const resource: CreatePermissionDto = {
      id: data.id,
      name: data.name,
      path: data.path,
      method: data.method,
    };

    return resource;
  }
}
