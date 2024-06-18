import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CustomException } from './exceptions';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      statusCode: status,
      message: exception.message || 'Internal Server Error',
      error: exception.name || 'Error',
    };

    if (exception instanceof CustomException) {
      response.status(status).json(errorResponse);
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        ...errorResponse,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
      });
    }

    console.log("Logging: " + errorResponse.error, errorResponse.statusCode, errorResponse.message);
  }
}