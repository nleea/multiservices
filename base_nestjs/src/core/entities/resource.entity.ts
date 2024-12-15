import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { RolEntity } from './rol.entity';
import { BaseModel } from './base.entity';
import { RolResourceEntity } from './rol-resource.entity';

@Entity('auth_module_resource')
export class ResourceEntity extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, nullable: false })
  name: string;

  @Column({ length: 30, unique: true, nullable: false })
  path: string;

  @Column({ length: 30, default: '' })
  icon: string = '';

  @ManyToOne(() => ResourceEntity, (resource) => resource.children, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'resource_parent_id' })
  resource_parent: ResourceEntity;

  @OneToMany(() => ResourceEntity, (resource) => resource.resource_parent, {
    createForeignKeyConstraints: true,
  })
  children: ResourceEntity[];

  @OneToMany(() => RolEntity, (rol) => rol.resources)
  rolResources: RolResourceEntity[];

  @Column({ type: 'int', default: 0 })
  order: number = 0;
}
