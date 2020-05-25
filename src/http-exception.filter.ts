import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      const status:number = exception.getStatus();

      // @ts-ignore
    return response.status(status)
        .json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
        });
  }

}