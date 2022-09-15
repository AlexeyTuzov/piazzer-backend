import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { constantCase } from 'change-case';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception['status'] || HttpStatus.INTERNAL_SERVER_ERROR;
    const code = constantCase(exception['code'] || 'INTERNAL_SERVER_ERROR');
    const message = exception['message'] || undefined;
    return response.status(status).json({ status, code, message });
  }
}
