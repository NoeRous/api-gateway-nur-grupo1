import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ClientKafka, EventPattern } from '@nestjs/microservices';
import { read } from 'fs';
import { CreatePatientDto } from './dtos/create-patient.dto';

@Controller('advice')
export class AdviceController implements OnModuleInit {
  constructor(
    @Inject('ADVICE_SERVICE')
    private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('create_patient');
    this.kafkaClient.subscribeToResponseOf('get_all_patients');
    this.kafkaClient.subscribeToResponseOf('get_patient_by_id');
    this.kafkaClient.subscribeToResponseOf('update_patient');
    this.kafkaClient.subscribeToResponseOf('delete_patient');
    await this.kafkaClient.connect();
  }

  @Post('create-patient')
  createPatient(@Body() data: CreatePatientDto) {
    return this.kafkaClient.send('create_patient', data);
  }

  @Get('all-patients')
  getAllPatients() {
    return this.kafkaClient.send('get_all_patients', {});
  }

  @Get('patient/:id')
  getPatientById(@Param('id') id: string) {
    return this.kafkaClient.send('get_patient_by_id', { id });
  }

  @Put('patient/:id')
  updatePatient(@Param('id') id: string, @Body() data: any) {
    return this.kafkaClient.send('update_patient', { id, ...data });
  }

  @Delete('patient/:id')
  deletePatient(@Param('id') id: string) {
    return this.kafkaClient.send('delete_patient', { id });
  }
}
