import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { QiniuModule } from '@/qiniu/qiniu.module'; 


@Module({
  imports: [QiniuModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
