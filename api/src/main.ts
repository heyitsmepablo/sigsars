import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { writeFileSync } from 'fs';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('e-SEMUS')
    .setDescription(
      'O e-SEMUS (Sistema Integrado de SEMUS) é um sistema de informação voltado para a gestão e integração de dados da Secretaria Municipal de Saude (SEMUS)',
    )
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      bearerFormat: 'JWT',
      name: 'authorization',
      description: 'Token para autenticação do usuario',
      in: 'header',
    })
    .addTag('Autenticação') // Adiciona primeiro
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api/v1/doc', app, document);
  writeFileSync('./swagger.json', JSON.stringify(document));
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
