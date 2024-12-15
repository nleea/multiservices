import { UseCase, CreateRolDto, UpdateRolDto } from '../../../core';
import { RolMapper } from '../../mappers/rol.mappers';
import { RolRepository } from '../../repositories/rol/rol.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RolService implements UseCase<CreateRolDto | UpdateRolDto> {
  constructor(
    private readonly repository: RolRepository,
    private readonly rolMapper: RolMapper,
  ) {}

  public async post(post: CreateRolDto): Promise<CreateRolDto> {
    const entity = this.rolMapper.mapFrom(post);
    const createdPost = await this.repository.create(entity);
    return this.rolMapper.mapTo(createdPost!);
  }

  public async getAll(): Promise<CreateRolDto[]> {
    const getAllroles = await this.repository.getAll();
    return getAllroles.map((rol) => this.rolMapper.mapTo(rol!));
  }

  public async update(
    id: string,
    data: UpdateRolDto,
  ): Promise<CreateRolDto | string> {
    const resulstUpdate = await this.repository.update(id, data);

    if (resulstUpdate.affected === 0) {
      return 'Not Found';
    }

    const rolUpdate = await this.repository.get(id);
    return this.rolMapper.mapTo(rolUpdate!);
  }

  public async getOne(id: string): Promise<CreateRolDto | string> {
    const getOneData = await this.repository.get(id);

    if (getOneData) return this.rolMapper.mapTo(getOneData);

    return 'Not Found';
  }
}
