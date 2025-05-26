import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())

  app.enableCors({
    origin: ['http://localhost:3000'], // Permite este dominio
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  const swaggerConfig = new DocumentBuilder()
                                  .setTitle('demoProyecto')
                                  .setDescription('trying the api to swagger')
                                  .setVersion('1.0')
                                  .build()

const document = SwaggerModule.createDocument(app,swaggerConfig);
    SwaggerModule.setup('api',app,document)
  await app.listen(3003);
}

bootstrap();
