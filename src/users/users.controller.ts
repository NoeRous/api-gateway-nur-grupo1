import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('users')
export class UsersController {
  constructor(
  @Inject('USERS_SERVICE') private client: ClientProxy,
) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getUsers() {
    return this.client.send({ cmd: 'get_users' }, {});
  }
}