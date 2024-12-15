import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RolEntity } from './rol.entity';
import { ResourceEntity } from './resource.entity';
import { BaseModel } from './base.entity';

@Entity('auth_module_rol_resource')
export class RolResourceEntity extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RolEntity, (rol) => rol.rolResources, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'rol_id' })
  rol: RolEntity;

  @ManyToOne(() => ResourceEntity, (resource) => resource.rolResources, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'resource_id' })
  resource: ResourceEntity;

  async validateVisibility() {
    if (!this.resource.visible) {
      throw new Error(
        `The resource '${this.resource.name}' must be visible to be assigned to a role.`,
      );
    }
  }
}
