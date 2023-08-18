import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error | HttpException, host: ArgumentsHost): void {
    const response: Response = host.switchToHttp().getResponse();
    const status: HttpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.BAD_REQUEST;
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      name: exception.name,
      message: exception.message,
    });
  }
}
