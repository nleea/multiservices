import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { RolService } from '../../../infrastructure/service/auth/rol.service';
import { CreateRolDto, UpdateRolDto } from 'src/core';

@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Get()
  findAll() {
    return this.rolService.getAll();
  }

  @Post()
  create(@Body() createRolDto: CreateRolDto) {
    return this.rolService.post(createRolDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRolDto: UpdateRolDto) {
    return this.rolService.update(id, updateRolDto);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.rolService.getOne(id);
  }
}
