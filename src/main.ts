import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 4000; // 3000 conflicts with React

const corsOptions = {
  origin: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: 'Content-Type, Accept, Authorization',
  credentials: true,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors(corsOptions);

  const config = new DocumentBuilder()
    .setTitle('Games API')
    .setDescription('Score keeping for games')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT);
}
bootstrap();
