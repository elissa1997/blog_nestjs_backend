import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ArticleModule } from './article/article.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [AuthModule, PrismaModule, ArticleModule, CommentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
