import { Controller, Post, Body, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('delivery')
export class DeliveryController {
  constructor(
  @Inject('DELIVERY_SERVICE') private client: ClientProxy,
) {}

  //@UseGuards(JwtAuthGuard)
  @Post('create-dealer')
  @ApiOperation({ summary: 'Crear un nuevo Repartidor', description: 'Crea un Repartidor con los datos proporcionados.' })
  @ApiResponse({ status: 201, description: 'Dealer creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  createDealer(@Body() body: any) {
    return this.client.send('create_dealer',body                    
    );
  }
}