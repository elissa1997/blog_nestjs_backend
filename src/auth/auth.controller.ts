import { Body, Controller, ParseIntPipe, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import RegisterDto from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private auth:AuthService) {}

  // 注册
  @Post('register')
  register(@Body() dto: RegisterDto, @Body('admin', ParseIntPipe) admin: number) {
    dto.admin = admin;
    return this.auth.register(dto);

  }

  // 登录
  @Post('login')
  login() {

  }
}
