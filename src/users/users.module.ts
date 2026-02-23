import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersController } from './users.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE', // 👈 DEBE COINCIDIR EXACTO
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'users_queue', // 👈 misma queue que microservicio
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [UsersController],
})
export class UsersModule {}