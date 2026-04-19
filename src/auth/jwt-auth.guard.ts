import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const path = request.url;

    const publicRoutes = [
      '/api/auth/login',
      '/api/users/register',
      '/api/auth/refresh',
      '/api/auth/logout',
      '/api/docs',
      '/api/auth/register',
    ];

    if (publicRoutes.some((route) => path.startsWith(route))) {
      return true;
    }

    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpException(
        { message: 'No se proporcionó token de autorización' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = authHeader.substring(7);

    try {
      const secret =
        this.configService.get<string>('JWT_SECRET') ||
        'mi_secreto_super_seguro';
      const payload = this.jwtService.verify(token, { secret });

      request['user'] = payload;
      return true;
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expirado');
      }
      throw new UnauthorizedException('Token inválido');
    }
  }
}
