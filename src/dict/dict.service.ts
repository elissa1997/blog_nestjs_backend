import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { addDto } from './dto/add.dto';
import { updateDto } from './dto/update.dto';
import { findAllDto } from './dto/findall.dto';

@Injectable()
export class DictService {
  constructor(private prisma: PrismaService) {}

  async create(dto: addDto) {
    return this.prisma.dict.create({
      data: {
        dict_type: dto.dict_type,
        name: dto.name,
        value: dto.value,
      },
    });
  }

  async findAll(dto: findAllDto) {
    let where = {};

    if (dto.dict_type) {
      where['dict_type'] = dto.dict_type;
    }

    const dicts = await this.prisma.dict.findMany({
      where,
    });

    return dicts;
  }

  async findOne(id: number) {
    return this.prisma.dict.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(dto: updateDto) {
    return this.prisma.dict.update({
      where: {
        id: dto.id,
      },
      data: {
        dict_type: dto.dict_type,
        name: dto.name,
        value: dto.value,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.dict.delete({
      where: {
        id: id,
      },
    });
  }
}