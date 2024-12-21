import { Module } from '@nestjs/common';
import { AppController } from './controllers/app/app.controller';
import { AppService } from './infrastructure/service/app/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import Configuration from '../config/configuration';
import { CONFIG_DB } from '../config/db';
import { RolsModule } from './controllers/auth/rol/rol.module';
import { ResourcesModule } from './controllers/auth/resource/resource.module';
import { SecurityModule } from './controllers/auth/security/security.module';
import {
  RolEntity,
  ResourceEntity,
  PermissionEntity,
  RolPermissionEntity,
  RolResourceEntity,
} from './core/entities';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './core/strategy/auth.strategy';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...CONFIG_DB,
      entities: [
        RolEntity,
        ResourceEntity,
        PermissionEntity,
        RolPermissionEntity,
        RolResourceEntity,
      ],
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [Configuration],
    }),
    PassportModule,
    JwtModule.register({
      secret: Configuration().jwt_secret,
      signOptions: { expiresIn: '12h', algorithm: 'HS256' },
    }),
    RolsModule,
    ResourcesModule,
    SecurityModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
