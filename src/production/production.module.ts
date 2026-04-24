import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductionController } from './production.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'PRODUCTION_SERVICE',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const broker = configService.get<string>('KAFKA_BROKER');

          console.log('👉 KAFKA_BROKER desde ConfigService:', broker);

          return {
            transport: Transport.KAFKA,
            options: {
              client: {
                brokers: [broker || 'localhost:29092'],
              },
              consumer: {
                groupId: 'production-gateway-client',
                allowAutoTopicCreation: true,
              },
              producer: {
                allowAutoTopicCreation: true,
              },
            },
          };
        },
      },
    ])
  ],
  controllers: [ProductionController],
})
export class ProductionModule {}
