import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MyLoggerService extends Logger {
  logError(message: string, stack: string) {
    this.error(message, stack);
  }
}