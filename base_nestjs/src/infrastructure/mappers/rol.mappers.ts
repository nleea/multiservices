import { Mapper, RolEntity, CreateRolDto } from '../../core';
import { Injectable } from '@nestjs/common';
@Injectable()
export class RolMapper extends Mapper<CreateRolDto, RolEntity> {
  public mapFrom(data: CreateRolDto): RolEntity {
    const post = new RolEntity();

    post.name = data.name;
    return post;
  }

  public mapTo(data: RolEntity): CreateRolDto {
    const post = new CreateRolDto();

    post.id = data.id;
    post.name = data.name;

    return post;
  }
}
