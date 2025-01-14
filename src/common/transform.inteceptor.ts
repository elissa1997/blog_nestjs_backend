import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { map } from 'rxjs/operators'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const httpContext: HttpArgumentsHost = context.switchToHttp();
    const request = context.switchToHttp().getRequest();
    const response = httpContext.getResponse();
    return next.handle().pipe(
      map((data) => {
        if (response.statusCode === 201) {
          response.status(200);
        }
        if (request.route.path === '/auth/login') {
          return {
            code: response.statusCode,
            token: data.token,
            message: '登录成功'
          }
          
        }else{
          return {
            code: response.statusCode,
            data,
            message: '查询成功'
          }
        }
      }),
    )
  }
}