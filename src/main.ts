import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const jwtAuthGuard = app.get(JwtAuthGuard);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalGuards(jwtAuthGuard);

  const config = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('Documentación del API Gateway')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);


  await app.startAllMicroservices();
  await app.listen(4000);
}
bootstrap();
