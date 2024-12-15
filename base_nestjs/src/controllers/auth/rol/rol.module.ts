import { RolService } from '../../../infrastructure/service/auth/rol.service';
import { RolRepository } from '../../../infrastructure/repositories/rol/rol.repository';
import { RolController } from './rol.controller';
import { Module } from '@nestjs/common';
import { RolRepositoryImpl } from '../../../infrastructure/repositories/rol/rol.repositoryimp';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolEntity } from 'src/core';
import { RolMapper } from '../../../infrastructure/mappers/rol.mappers';

@Module({
  imports: [TypeOrmModule.forFeature([RolEntity])],
  controllers: [RolController],
  providers: [
    RolMapper,
    {
      provide: RolRepository,
      useClass: RolRepositoryImpl,
    },
    {
      provide: RolService,
      useFactory: (repository: RolRepository, rolMapper: RolMapper) =>
        new RolService(repository, rolMapper),
      inject: [RolRepository, RolMapper],
    },
  ],
})
export class RolsModule {}
