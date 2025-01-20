import { Controller, Get, Post, Body, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { DictService } from './dict.service';
import { AuthGuard } from '@nestjs/passport';
import addDto from './dto/add.dto';
import findAllDto from './dto/findall.dto';
import updateDto from './dto/update.dto';
import deleteDto from './dto/delete.dto';
import FindByTypeDto from './dto/findByType.dto';

@Controller('dict')
export class DictController {
  constructor(private readonly dictService: DictService) {}

  @Post('add')
  create(@Body() dto: addDto) {
    return this.dictService.create(dto);
  }

  @Get('list')
  @UseGuards(AuthGuard('jwt'))
  findAll(
    @Query() dto: findAllDto,
  ) {
    return this.dictService.findAll(dto);
  }

  @Get('detail')
  findOne() {
    return "无此接口";
  }

  @Get('findbytype')
  fundByType(
    @Query() dto: FindByTypeDto,
  ) {
    return this.dictService.findByType(dto);
  }

  @Post('update')
  @UseGuards(AuthGuard('jwt'))
  update(@Body() dto: updateDto) {
    return this.dictService.update(dto);
  }

  @Post('delete')
  @UseGuards(AuthGuard('jwt'))
  remove(
    @Body() dto: deleteDto
  ) {
    return this.dictService.remove(dto);
  }
}