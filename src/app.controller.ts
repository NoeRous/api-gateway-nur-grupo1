import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Get('health')
  health() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }

  @Post('login')
  async login(@Body() body: any) {
    const user = { userId: 1, username: body.username };
    return this.authService.login(user);
  }
}
