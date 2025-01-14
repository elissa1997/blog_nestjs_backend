import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [AuthModule, PrismaModule, ArticleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
