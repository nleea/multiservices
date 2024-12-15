import { Mapper, ResourceEntity, CreateResourceDto } from '../../core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ResourceMapper extends Mapper<CreateResourceDto, ResourceEntity> {
  public mapFrom(data: CreateResourceDto): ResourceEntity {
    const resource = new ResourceEntity();

    resource.name = data.name;
    resource.path = data.path;

    if (data.resource_parent) {
      const resource_parent = new ResourceEntity();
      resource_parent.id = data.resource_parent;
      resource.resource_parent = resource_parent;
    }
    return resource;
  }

  public mapTo(data: ResourceEntity): CreateResourceDto {
    const resource: CreateResourceDto = {
      id: data.id,
      name: data.name,
      path: data.path,
      resource_parent: data.resource_parent || null,
    };

    return resource;
  }
}
