import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exception-handler';
import { MyLoggerService } from './logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new MyLoggerService();
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new BadRequestException(result);
      },
      stopAtFirstError: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  await app.listen(3000);
  console.log("Server running on port 3000");
}
bootstrap();