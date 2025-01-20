import { Controller, Get, Post, Body, Req, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { OtherCommentService } from './otherComment.service';
import addDto from './dto/add.dto';
import findAllDto from './dto/findall.dto';
import deleteDto from './dto/delete.dto';
import updateDto from './dto/update.dto';
import FindByTypeDto from './dto/findByType.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('othercomment')
export class OtherCommentController {
  constructor(private readonly otherCommentService: OtherCommentService) {}

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
    return this.otherCommentService.create(dto);
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
    return this.otherCommentService.findAll(dto);
  }

  @Get('detail')
  findOne() {
    return "无此接口";
  }

  @Get('findbytype')
  fundByType(
    @Query() dto: FindByTypeDto,
    @Query('type', ParseIntPipe) type: number
  ) {
    dto.type = type;
    return this.otherCommentService.findByType(dto);
  }

  @Post('update')
  @UseGuards(AuthGuard('jwt'))
  update(@Body() dto: updateDto) {
    return this.otherCommentService.update(dto);
  }

  @Post('delete')
  @UseGuards(AuthGuard('jwt'))
  remove(
    @Body() dto: deleteDto
  ) {
    return this.otherCommentService.remove(dto);
  }
}