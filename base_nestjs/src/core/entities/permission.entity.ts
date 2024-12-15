import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { RolEntity } from './rol.entity';
import { RolPermissionEntity } from './rol-permission.entity';
import { BaseModel } from './base.entity';

@Entity('auth_module_permission')
export class PermissionEntity extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, nullable: false })
  name: string;

  @Column({ length: 150, nullable: false })
  path: string;

  @Column({ length: 150, nullable: false })
  method: string;

  @ManyToMany(() => RolEntity, (rol) => rol.permissions)
  rol: RolEntity[];

  @OneToMany(
    () => RolPermissionEntity,
    (rolPermission) => rolPermission.permission,
  )
  rolPermissions: RolPermissionEntity[];

  @Column({ type: 'boolean', default: true })
  visible: boolean;
}
