import {
  Controller,
  Post,
  Body,
  Inject,
  Param,
  OnModuleInit,
  UseGuards,
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
    await this.kafkaClient.connect();
  }

  @Post('create-package-for-delivery')
  createDealer(@Body() body: any) {
    return this.kafkaClient.send('create_package', body);
  }
}
