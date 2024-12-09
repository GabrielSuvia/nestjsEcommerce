import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  
  app.enableCors({
    origin:'http://localhost:3000',//dominio frontend
    methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials:true//for cookies or headerof authentication
  })
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
