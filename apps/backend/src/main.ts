import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Get configuration service
  const configService = app.get(ConfigService);
  
  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  // Enable global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());
  
  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:19006'], // Add your frontend URLs
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });
  
  // Setup Prisma shutdown hooks
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  
  // Start the server
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  
  console.log(`🚀 Backend server running on: http://localhost:${port}`);
}

bootstrap();
