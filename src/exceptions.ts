import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super(message, status);
  }

  static BadRequest(message: string = 'Bad Request') {
    return new CustomException(message, HttpStatus.BAD_REQUEST);
  }

  static NotFound(message: string = 'Not Found') {
    return new CustomException(message, HttpStatus.NOT_FOUND);
  }
}