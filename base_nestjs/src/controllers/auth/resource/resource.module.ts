import { ResourceService } from '../../../infrastructure/service';
import { ResourceRepository } from '../../../infrastructure/repositories';
import { ResourceController } from './resource.controller';
import { Module } from '@nestjs/common';
import { ResourceRepositoryImpl } from '../../../infrastructure/repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceEntity } from 'src/core';
import { ResourceMapper } from '../../../infrastructure/mappers';
@Module({
  imports: [TypeOrmModule.forFeature([ResourceEntity])],
  controllers: [ResourceController],
  providers: [
    ResourceMapper,
    {
      provide: ResourceRepository,
      useClass: ResourceRepositoryImpl,
    },
    {
      provide: ResourceService,
      useFactory: (
        repository: ResourceRepository,
        resourceMapper: ResourceMapper,
      ) => new ResourceService(repository, resourceMapper),
      inject: [ResourceRepository, ResourceMapper],
    },
  ],
})
export class ResourcesModule {}
