import { Controller, Get, Post, Body, Req, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import addDto from './dto/add.dto';
import findAllDto from './dto/findall.dto';
import deleteDto from './dto/delete.dto';
import updateDto from './dto/update.dto';
import { AuthGuard } from '@nestjs/passport';

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

  @Get('list')
  @UseGuards(AuthGuard('jwt'))
  findAll(
    @Query() dto: findAllDto,
    @Query('offset', ParseIntPipe) offset: number,
    @Query('limits', ParseIntPipe) limits: number
  ) {
    dto.offset = offset;
    dto.limits = limits;
    return this.commentService.findAll(dto);
  }

  @Get('detail')
  findOne() {
    return "无此接口";
  }

  @Post('update')
  @UseGuards(AuthGuard('jwt'))
  update(@Body() dto: updateDto) {
    return this.commentService.update(dto);
  }


  @Post('delete')
  @UseGuards(AuthGuard('jwt'))
  remove(
    @Body() dto: deleteDto
  ) {
    return this.commentService.remove(dto);
  }
}
