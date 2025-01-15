import { Body, Controller, ParseIntPipe, Post, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import RegisterDto from './dto/register.dto';
import LoginDto from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

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
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  // 获取用户信息
  @Get('info')
  @UseGuards(AuthGuard('jwt'))
  userInfo(@Request() req) {
    delete req.user.password;
    return req.user;
  }
}
