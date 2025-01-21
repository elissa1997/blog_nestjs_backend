import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import addDto from './dto/add.dto';
import updateDto from './dto/update.dto';
import findAllDto from './dto/findall.dto';
import deleteDto from './dto/delete.dto';
import FindByTypeDto from './dto/findByType.dto';

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


    if (dto.search) {
      let searchObj = JSON.parse(dto.search);
      console.log(searchObj);
      Object.keys(searchObj).forEach(key => {
        switch (key) {
          case 'dict_type':
            where['dict_type'] = { contains: searchObj[key] };
            break;
          // 可以在这里添加更多的键名处理
        }
      });
      
    }

    const dicts = await this.prisma.dict.findMany({
      where,
      skip: (dto.offset - 1) * dto.limits,
      take: dto.limits,
    });

    return {
      rows: dicts,
      count: await this.prisma.dict.count({ where: where }),
    }
  }


  async findByType(dto: FindByTypeDto){
    const where = {
      dict_type: {contains: dto.dict_type},
    };

    const dicts = await this.prisma.dict.findMany({
      where
    });

    return {
      rows: dicts,
      count: await this.prisma.dict.count({ where: where }),
    }
  }

  async update(dto: updateDto) {
    if (dto.update_dict_type) {
      // 更新所有匹配 dict_type 的记录
      return this.prisma.dict.updateMany({
        where: {
          dict_type: dto.dict_type,
        },
        data: {
          dict_type: dto.update_dict_type,
        },
      });
    } else {
      // 更新单条记录
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
  }

  async remove(dto: deleteDto) {
    if (dto.dict_type && !dto.id) {
      return this.prisma.dict.deleteMany({
        where: {
          dict_type: dto.dict_type,
        },
      });
    } else {
      return this.prisma.dict.deleteMany({
        where: {
          id: {
            in: dto.id,
          },
        },
      });
    }
  }
}