import { Controller, Get, Param } from '@nestjs/common';
import { SecurityService } from '../../../infrastructure/service/auth';

@Controller('security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Get('resourcesByRol/:id')
  getResourcesByRol(@Param('id') id: string) {
    return this.securityService.getResourcesByRol(id);
  }

  @Get('permissionsByRol/:id')
  getPermissionsByRol(@Param('id') id: string) {
    return this.securityService.getPermissionsByRol(id);
  }
}
