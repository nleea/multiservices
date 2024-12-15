import { Injectable } from '@nestjs/common';
import { SecurityRepository } from './security.repository';
import { RolPermissionEntity, RolResourceEntity } from '../../../core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SecurityRepositoryImpl extends SecurityRepository {
  constructor(
    @InjectRepository(RolResourceEntity)
    private readonly rolResourceRepository: Repository<RolResourceEntity>,
    @InjectRepository(RolPermissionEntity)
    private readonly rolPermissionRepository: Repository<RolPermissionEntity>,
  ) {
    super();
  }

  updateResourcesByRol(): Promise<RolResourceEntity | null> {
    throw new Error('Method not implemented.');
  }

  getAllResourcesByRol(id: string): Promise<RolResourceEntity[] | []> {
    return this.rolResourceRepository
      .createQueryBuilder('rolResource')
      .leftJoinAndSelect('rolResource.rol', 'rol')
      .leftJoinAndSelect('rolResource.resource', 'resource')
      .where('rolResource.rol_id  = :rolId', { rolId: parseInt(id) })
      .getMany();
  }

  updatePermissionsByRol(): Promise<RolPermissionEntity[] | []> {
    throw new Error('Method not implemented.');
  }

  getAllPermissionsByRol(id: string): Promise<RolPermissionEntity[] | []> {
    return this.rolPermissionRepository
      .createQueryBuilder('rolPermission')
      .leftJoinAndSelect('rolPermission.rol', 'rol')
      .leftJoinAndSelect('rolPermission.permission', 'permission')
      .where('rolPermission.rol_id  = :rolId', { rolId: parseInt(id) })
      .getMany();
  }
}
