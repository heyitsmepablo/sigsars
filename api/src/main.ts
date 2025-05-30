import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('SIGSARS')
    .setDescription(
      'O SIGSARS (Sistema Integrado de Gestão da SARS) é um sistema de informação voltado para a gestão e integração de dados da Superintendência de Assistência à Rede de Saúde (SARS), órgão vinculado à Secretaria Municipal de Saúde (SEMUS).',
    )
    .setVersion('1.0')
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/v1/doc', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
