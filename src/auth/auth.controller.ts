import {
  Controller,
  Post,
  Body,
  Headers,
  UnauthorizedException,
  Get,
} from '@nestjs/common';
import { AuthProxyService } from './auth-proxy.service';

@Controller()
export class AuthController {
  constructor(private authProxyService: AuthProxyService) {}

  @Post('auth/login')
  async login(@Body() body: { email: string; password: string }) {
    if (!body.email || !body.password) {
      throw new UnauthorizedException('Email y contraseña son requeridos');
    }
    return this.authProxyService.login(body.email, body.password);
  }

  @Post('users/register')
  async register(
    @Body() body: { email: string; password: string; name: string },
  ) {
    if (!body.email || !body.password || !body.name) {
      throw new UnauthorizedException(
        'Email, contraseña y nombre son requeridos',
      );
    }
    return this.authProxyService.register(body.email, body.password, body.name);
  }

  @Post('auth/refresh')
  async refresh(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token requerido');
    }
    const token = authHeader.substring(7);
    return this.authProxyService.refreshToken(token);
  }

  @Post('auth/logout')
  async logout(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token requerido');
    }
    const token = authHeader.substring(7);
    return this.authProxyService.logout(token);
  }

  @Get('saludo')
  async saludo() {
    return 'Hola desde el api gateway!';
  }
}
