import {
  Controller,
  Post,
  Body,
  Inject,
  Param,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller('delivery')
export class DeliveryController implements OnModuleInit {
  constructor(
    @Inject('DELIVERY_SERVICE') // 👈 debe coincidir con el módulo
    private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('create_dealer');
    this.kafkaClient.subscribeToResponseOf('deliver_package');
    await this.kafkaClient.connect();
  }

  @Post('create-dealer')
  createDealer(@Body() body: any) {
    return this.kafkaClient.send('create_dealer', body);
  }

  @Post('deliver/:id')
  deliverPackage(@Param('id') id: string) {
    return this.kafkaClient.send('deliver_package', id);
  }
}