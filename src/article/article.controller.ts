import { Controller, Get, Post, Body, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import updateDto from './dto/update.dto';
import findAllDto from './dto/findall.dto';
import findOneDto from './dto/findone.dto';
import addDto from './dto/add.dto';
import deleteDto from './dto/delete.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('add')
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() dto: addDto,
    @Body('category', ParseIntPipe) category: number,
    @Body('status', ParseIntPipe) status: number
  ) {
    dto.category = category;
    dto.status = status;
    return this.articleService.create(dto);
  }

  @Get('list')
  findAll(
    @Query() dto: findAllDto,
    @Query('offset', ParseIntPipe) offset: number,
    @Query('limits', ParseIntPipe) limits: number
  ) {
    dto.offset = offset;
    dto.limits = limits;
    return this.articleService.findAll(dto);
  }

  @Get('detail')
  findOne(
    @Query() dto: findOneDto,
    @Query('a_id', ParseIntPipe) a_id: number
  ) {
    dto.a_id = a_id;
    return this.articleService.findOne(dto);
  }

  @Post('update')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Body() dto: updateDto,
    @Body('a_id', ParseIntPipe) a_id: number
  ) {
    dto.a_id = a_id;
    return this.articleService.update(dto);
  }

  @Post('delete')
  @UseGuards(AuthGuard('jwt'))
  remove(
    @Body() dto: deleteDto
  ) {
    console.log(dto);
    return this.articleService.remove(dto);
  }
}
