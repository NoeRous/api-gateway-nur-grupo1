import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DeliveryController } from './delivery.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'DELIVERY_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: 'delivery-gateway-client',
            allowAutoTopicCreation: true,
          },
          producer: {
            allowAutoTopicCreation: true,
          },
        },
      },
    ]),
  ],
  controllers: [DeliveryController],
})
export class DeliveryModule {}
