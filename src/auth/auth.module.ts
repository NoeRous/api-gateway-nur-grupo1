import { Module, Global } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthProxyService } from './auth-proxy.service';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './jwt-auth.guard';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    HttpModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret:
          configService.get<string>('JWT_SECRET') || 'mi_secreto_super_seguro',
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [AuthProxyService, JwtAuthGuard],
  controllers: [AuthController],
  exports: [AuthProxyService, JwtAuthGuard, JwtModule, PassportModule],
})
export class AuthModule {}
