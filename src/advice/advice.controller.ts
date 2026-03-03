import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientKafka, EventPattern } from "@nestjs/microservices";
import { read } from "fs";
import { CreatePatientDto } from './dtos/create-patient.dto';

@Controller("advice")
export class AdviceController implements OnModuleInit {

  constructor(
    @Inject('ADVICE_SERVICE')
    private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('create_patient');
    await this.kafkaClient.connect();
  }

  @Post('create-patient')
  createPatient(@Body() data: CreatePatientDto) {
    return this.kafkaClient.send('create_patient', data);
  }

}