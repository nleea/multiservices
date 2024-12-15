import { Module } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { SecurityService } from '../../../infrastructure/service';
import { SecurityController } from './security.controller';
import {
  SecurityRepository,
  SecurityRepositoryImpl,
} from '../../../infrastructure/repositories';
import { RolPermissionEntity, RolResourceEntity } from 'src/core';
import {
  ResourceMapper,
  PermissionMapper,
} from '../../../infrastructure/mappers';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RolPermissionEntity, RolResourceEntity])],
  controllers: [SecurityController],
  providers: [
    ResourceMapper,
    PermissionMapper,
    {
      provide: SecurityRepository,
      useFactory: (
        rolResourceRepo: Repository<RolResourceEntity>,
        rolPermissionRepo: Repository<RolPermissionEntity>,
      ) => new SecurityRepositoryImpl(rolResourceRepo, rolPermissionRepo),
      inject: [
        getRepositoryToken(RolResourceEntity),
        getRepositoryToken(RolPermissionEntity),
      ],
    },
    {
      provide: SecurityService,
      useFactory: (
        repository: SecurityRepository,
        resourceMapper: ResourceMapper,
        permissionMapper: PermissionMapper,
      ) => new SecurityService(repository, resourceMapper, permissionMapper),
      inject: [SecurityRepository, ResourceMapper, PermissionMapper],
    },
  ],
})
export class SecurityModule {}
