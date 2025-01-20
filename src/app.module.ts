import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ArticleModule } from './article/article.module';
import { CommentModule } from './comment/comment.module';
import { ConfigModule } from '@nestjs/config';
import { OtherCommentModule } from './otherComment/otherComment.module';
import { DictModule } from './dict/dict.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ArticleModule,
    CommentModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'],
    }),
    OtherCommentModule,
    DictModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}