import { Module } from '@nestjs/common';
import { AdviceController } from './advice.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ADVICE_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
          brokers: [process.env.KAFKA_BROKER || 'localhost:29092'],
          },
          consumer: {
            groupId: 'advice-group',
          },
        },
      },
    ]),
  ],
  controllers: [AdviceController],
})
export class AdviceModule {}
