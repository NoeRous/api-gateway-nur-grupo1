import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot(); // Load .env file

const rabbitMQUrl = process.env.RABBITMQ_URL;
const deliveryQueue = process.env.DELIVERY_QUEUE;
const usersQueue = process.env.USERS_QUEUE;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('Documentación del API Gateway')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  console.log(`RabbitMQ URL: ${rabbitMQUrl}`);
  console.log(`Delivery Queue: ${deliveryQueue}`);
  console.log(`Users Queue: ${usersQueue}`);

  await app.listen(4000);
}
bootstrap();