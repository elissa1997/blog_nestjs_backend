import { Module } from '@nestjs/common';
import { OtherCommentService } from './otherComment.service';
import { OtherCommentController } from './otherComment.controller';
import { QiniuModule } from '@/qiniu/qiniu.module'; 

@Module({
  imports: [QiniuModule],
  controllers: [OtherCommentController],
  providers: [OtherCommentService],
})
export class OtherCommentModule {}