import { BadRequestException, Injectable } from '@nestjs/common';
import RegisterDto from './dto/register.dto';
import LoginDto from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash, verify } from 'argon2'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        password: await hash(dto.password),
        email: dto.email,
        admin: dto.admin,
      },
    });

    return this.token(user);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        name: dto.name,
      }
    })
    if(!(await verify(user.password, dto.password))) {
      throw new BadRequestException('密码输入错误')
    }

    return this.token(user);
  }

  async userInfo() {
    console.log()
    // const user = await this.prisma.user.findUnique({
    //   where: {
    //     id: sub,
    //   }
    // })
    // return user;
  }

  private async token({id, name}) {
    return {
      token: await this.jwt.signAsync(
        {
          name,
          sub: id,
        }
      ),
    }
  }
}
