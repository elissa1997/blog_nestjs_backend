import { Controller, Get, Post, Body, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { DictService } from './dict.service';
import { addDto } from './dto/add.dto';
import { findAllDto } from './dto/findall.dto';
import { updateDto } from './dto/update.dto';
import { AuthGuard } from '@nestjs/passport';

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
  findOne(@Query('id', ParseIntPipe) id: number) {
    return this.dictService.findOne(id);
  }

  @Post('update')
  @UseGuards(AuthGuard('jwt'))
  update(@Body() dto: updateDto) {
    return this.dictService.update(dto);
  }

  @Post('delete')
  @UseGuards(AuthGuard('jwt'))
  remove(
    @Query('id', ParseIntPipe) id: number
  ) {
    return this.dictService.remove(id);
  }
}