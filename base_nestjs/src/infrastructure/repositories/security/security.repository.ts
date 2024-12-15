import { RolResourceEntity, RolPermissionEntity } from '../../../core';

export abstract class SecurityRepository {
  abstract updatePermissionsByRol(
    id: string,
  ): Promise<RolPermissionEntity[] | []>;

  abstract getAllPermissionsByRol(
    id: string,
  ): Promise<RolPermissionEntity[] | []>;

  abstract updateResourcesByRol(): Promise<RolResourceEntity | null>;

  abstract getAllResourcesByRol(id: string): Promise<RolResourceEntity[] | []>;
}
