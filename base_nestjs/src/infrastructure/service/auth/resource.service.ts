import { UseCase, CreateResourceDto, UpdateResourceDto } from '../../../core';
import { ResourceMapper } from '../../mappers';
import { ResourceRepository } from '../../repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ResourceService
  implements UseCase<CreateResourceDto | UpdateResourceDto>
{
  constructor(
    private readonly repository: ResourceRepository,
    private readonly resourceMapper: ResourceMapper,
  ) {}

  public async post(data: CreateResourceDto): Promise<CreateResourceDto> {
    const entity = this.resourceMapper.mapFrom(data);
    const createdResource = await this.repository.create(entity);
    return this.resourceMapper.mapTo(createdResource!);
  }

  public async getAll(): Promise<CreateResourceDto[]> {
    const getAllResources = await this.repository.getAll();
    return getAllResources.map((resource) =>
      this.resourceMapper.mapTo(resource!),
    );
  }

  public async update(
    id: string,
    data: UpdateResourceDto,
  ): Promise<CreateResourceDto | string> {
    const resulstUpdate = await this.repository.update(id, data);

    if (resulstUpdate.affected === 0) {
      return 'Not Found';
    }

    const updateData = await this.repository.get(id);
    return this.resourceMapper.mapTo(updateData!);
  }

  public async getOne(id: string): Promise<CreateResourceDto | string> {
    const getOneData = await this.repository.get(id);
    if (getOneData) return this.resourceMapper.mapTo(getOneData);

    return 'Not Found';
  }
}
