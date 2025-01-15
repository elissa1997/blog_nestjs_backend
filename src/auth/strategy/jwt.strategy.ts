import { PrismaService } from "@/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(ConfigService: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: ConfigService.get('TOKEN_SECRET'),
    });
  }

  async validate({sub: id}) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    })
  }
}