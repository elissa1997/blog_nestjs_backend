import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CommentService } from './comment.service';
import addDto from './dto/add.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('add')
  create(@Body() dto: addDto, @Req() req) {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (ip && ip.includes(':')) {
      const ipv4Mapped = ip.split(':').find(part => part.match(/\d+\.\d+\.\d+\.\d+/));
      if (ipv4Mapped) {
        ip = ipv4Mapped;
      }
    }
    dto.ip = ip;
    return this.commentService.create(dto);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Post('update')
  update(@Body() dto: any) {
    // return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
