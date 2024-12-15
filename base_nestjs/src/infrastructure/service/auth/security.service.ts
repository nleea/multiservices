import { CreateResourceDto, CreatePermissionDto } from '../../../core';
import { ResourceMapper, PermissionMapper } from '../../mappers';
import { SecurityRepository } from '../../repositories';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SecurityService {
  constructor(
    @InjectRepository(SecurityRepository)
    private readonly repository: SecurityRepository,
    private readonly resourceMapper: ResourceMapper,
    private readonly permissionMapper: PermissionMapper,
  ) {}

  public async getResourcesByRol(id: string): Promise<CreateResourceDto[]> {
    const getAllResourcesByRol = await this.repository.getAllResourcesByRol(id);
    return getAllResourcesByRol.map((item) =>
      this.resourceMapper.mapTo(item.resource!),
    );
  }

  public async getPermissionsByRol(id: string): Promise<CreatePermissionDto[]> {
    const getAllPermissionByRol =
      await this.repository.getAllPermissionsByRol(id);
    return getAllPermissionByRol.map((item) =>
      this.permissionMapper.mapTo(item.permission),
    );
  }
}
