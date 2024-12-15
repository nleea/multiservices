import { Injectable } from '@nestjs/common';
import { ResourceRepository } from './resource.repository';
import { ResourceEntity } from '../../../core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ResourceRepositoryImpl extends ResourceRepository {
  constructor(
    @InjectRepository(ResourceEntity)
    private readonly repository: Repository<ResourceEntity>,
  ) {
    super();
  }

  get(id: string): Promise<ResourceEntity | null> {
    return this.repository
      .createQueryBuilder('resource')
      .setFindOptions({ loadRelationIds: true })
      .where('resource.id = :id', { id: parseInt(id) })
      .getOne();
  }

  update(id: string, item: Partial<ResourceEntity>) {
    return this.repository.update(id, item);
  }

  async create(entity: ResourceEntity): Promise<ResourceEntity> {
    return this.repository.save(entity);
  }

  async getAll(): Promise<ResourceEntity[]> {
    return this.repository.find({
      loadRelationIds: true,
      order: { id: 'ASC' },
    });
  }
}
