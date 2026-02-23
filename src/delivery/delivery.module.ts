import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DeliveryController } from './delivery.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'DELIVERY_SERVICE', 
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'delivery_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [DeliveryController],
})
export class DeliveryModule {}