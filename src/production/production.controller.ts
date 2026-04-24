import {
  Controller,
  Post,
  Body,
  Inject,
  Param,
  OnModuleInit,
  UseGuards,
  Get,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('production')
export class ProductionController implements OnModuleInit {
  constructor(
    @Inject('PRODUCTION_SERVICE')
    private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('create_package');
    this.kafkaClient.subscribeToResponseOf('production.orders.findAll');
    await this.kafkaClient.connect();
  }

  @Post('create-package-for-delivery')
  createPackage(@Body() body: any) {
    return this.kafkaClient.send('create_package', body);
  }

  @Get('orders')
  getOrders() {
    return this.kafkaClient.send('production.orders.findAll', {});
  }
}
