import { Injectable } from '@nestjs/common';
import { RolRepository } from './rol.repository';
import { RolEntity } from '../../../core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolRepositoryImpl extends RolRepository {
  constructor(
    @InjectRepository(RolEntity)
    private readonly repository: Repository<RolEntity>,
  ) {
    super();
  }

  get(id: string): Promise<RolEntity | null> {
    return this.repository.findOneBy({ id: parseInt(id) });
  }

  update(id: string, item: Partial<RolEntity>) {
    return this.repository.update(id, item);
  }

  async create(entity: RolEntity): Promise<RolEntity> {
    return this.repository.save(entity);
  }

  async getAll(): Promise<RolEntity[]> {
    return this.repository.find();
  }
}
