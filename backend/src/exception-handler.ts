import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { MyLoggerService } from './logger.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: MyLoggerService) { }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    let message = exception.message || 'Internal Server Error';

    if (exception instanceof BadRequestException) {
      status = HttpStatus.BAD_REQUEST;
      const validationError = exception.getResponse()['message'] || 'Validation failed';
      message = typeof validationError === 'string' ? validationError : JSON.stringify(validationError);
    }

    const errorResponse = {
      statusCode: status,
      message: message,
      error: exception.name || 'Error',
    };

    this.logger.logError(`Exception caught: ${errorResponse.error} - ${errorResponse.statusCode} - ${errorResponse.message}`, exception.stack);
    response.status(status).json(errorResponse);
  }
}