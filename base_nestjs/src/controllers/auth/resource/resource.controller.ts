import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ResourceService } from '../../../infrastructure/service';
import { CreateResourceDto, UpdateResourceDto } from 'src/core';
import { JwtAuthGuard } from '../../../infrastructure/guards/jwt-auth-guard';

@Controller('resource')
export class ResourceController {
  constructor(private readonly Service: ResourceService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.Service.getAll();
  }

  @Post()
  create(@Body() BodyDto: CreateResourceDto) {
    return this.Service.post(BodyDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() BodyDto: UpdateResourceDto) {
    return this.Service.update(id, BodyDto);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.Service.getOne(id);
  }
}
