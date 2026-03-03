import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DeliveryModule } from './delivery/delivery.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AdviceModule } from './advice/advice.module';
import { ProductionModule } from './production/production.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    DeliveryModule,
    AdviceModule,
    ProductionModule
  ],
  controllers: [AppController],
})
export class AppModule {}