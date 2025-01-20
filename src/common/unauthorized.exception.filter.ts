import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status = exception.getStatus();
    // 返回自定义格式
    response.status(status).json({
      code: 401,
      msg: '未授权访问',
    });
  }
}
