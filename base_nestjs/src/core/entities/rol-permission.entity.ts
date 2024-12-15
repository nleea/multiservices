import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
} from 'typeorm';
import { RolEntity } from './rol.entity';
import { PermissionEntity } from './permission.entity';
import { BaseModel } from './base.entity';

@Entity('auth_module_rol_permission')
export class RolPermissionEntity extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RolEntity, (rol) => rol.rolPermissions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'rol_id' })
  rol: RolEntity;

  @ManyToOne(
    () => PermissionEntity,
    (permission) => permission.rolPermissions,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'permission_id' })
  permission: PermissionEntity;

  @Column({ type: 'boolean', default: true })
  visible: boolean;

  async validateVisibility() {
    if (!this.permission.visible) {
      throw new Error(
        `The permission '${this.permission.name}' must be visible to be assigned to a role.`,
      );
    }
  }
}
