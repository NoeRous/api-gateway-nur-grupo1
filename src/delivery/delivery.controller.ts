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
    this.kafkaClient.subscribeToResponseOf('create_address_patient');
    this.kafkaClient.subscribeToResponseOf('create_schedule_patient');
    this.kafkaClient.subscribeToResponseOf('get_confirmed_deliveries_by_date');
    this.kafkaClient.subscribeToResponseOf('assign_package');
    this.kafkaClient.subscribeToResponseOf('deliver_package');
    await this.kafkaClient.connect();
  }

  @Post('create-address-patient')
  createAddressPatient(@Body() body: any) {
    return this.kafkaClient.send('create_address_patient', body);
  }

  @Post('create-schedule-patient')
  createSchedulePatient(@Body() body: any) {
    return this.kafkaClient.send('create_schedule_patient', body);
  }

  @Post('confirmed')
  getConfirmed(@Body() body: { date: string }) {
    return this.kafkaClient.send(
      'get_confirmed_deliveries_by_date',
      body.date,
    );
  }
  
  @Post('create-dealer')
  createDealer(@Body() body: any) {
    return this.kafkaClient.send('create_dealer', body);
  }

  @Post('assign-package')
  assingPackage(@Body() body: { date: string }) {
    return this.kafkaClient.send(
      'assign_package',
      body.date,
    );
  }

  @Post('deliver/:id')
  deliverPackage(@Param('id') id: string) {
    return this.kafkaClient.send('deliver_package', id);
  }  
}