import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DeliveryModule } from './delivery/delivery.module';
import { ConfigModule } from '@nestjs/config';
import { AdviceModule } from './advice/advice.module';
import { ProductionModule } from './production/production.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    DeliveryModule,
    // AdviceModule,
    ProductionModule,
  ],
  controllers: [],
})
export class AppModule {}
