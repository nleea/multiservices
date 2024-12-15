import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { ResourceEntity } from './resource.entity';
import { PermissionEntity } from './permission.entity';
import { RolResourceEntity } from './rol-resource.entity';
import { RolPermissionEntity } from './rol-permission.entity';
import { BaseModel } from './base.entity';

@Entity('auth_module_rol')
export class RolEntity extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, unique: true, nullable: false })
  name: string;

  @ManyToMany(() => ResourceEntity)
  @JoinTable({
    name: 'rol_resource',
    joinColumn: { name: 'id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'resource_id', referencedColumnName: 'id' },
  })
  resources: ResourceEntity[];

  @ManyToMany(() => PermissionEntity, (permission) => permission.rol)
  @JoinTable({
    name: 'rol_permission',
    joinColumn: { name: 'id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions: PermissionEntity[];

  @OneToMany(() => RolResourceEntity, (rolResource) => rolResource.rol)
  rolResources: RolResourceEntity[];

  @OneToMany(() => RolPermissionEntity, (rolPermission) => rolPermission.rol)
  rolPermissions: RolPermissionEntity[];
}
