import { Injectable } from '@nestjs/common';
import RegisterDto from './dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(dto: RegisterDto) {
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        password: await hash(dto.password),
        email: dto.email,
        admin: dto.admin,
      },
    });

    return user;
  }
}
