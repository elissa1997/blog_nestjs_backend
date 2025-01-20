import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { QiniuInvestigate } from '@/qiniu/qiniu.investigate';
import addDto from './dto/add.dto';
import findAllDto from './dto/findall.dto';
import deleteDto from './dto/delete.dto';
import updateDto from './dto/update.dto';
import { FindByTypeDto } from './dto/findByType.dto';

@Injectable()
export class OtherCommentService {
  constructor(
    private prisma: PrismaService,
    private qiniuInvestigate: QiniuInvestigate,
  ) {}

  async create(dto: addDto) {
    let investigate = await this.qiniuInvestigate.sendCommentToQiniu(dto.text);
    if (investigate.code === 200 && investigate.result.suggestion === 'pass') {
        return this.prisma.otherComment.create({
          data: {
            type: dto.type,
            parent_id: dto.parent_id,
            is_regist: dto.is_regist,
            user_name: dto.user_name,
            email: dto.email,
            url: dto.url,
            ip: dto.ip,
            agent: dto.agent,
            text: dto.text,
            status: dto.status,
          }
        });
    } else {
      throw new HttpException(
        {
          code: 400,
          msg: '评论内容违规',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(dto: findAllDto) {
    let where = {};

    if (dto.search) {
      let searchObj = JSON.parse(dto.search);
      Object.keys(searchObj).forEach(key => {
        switch (key) {
          case 'status':
            where['status'] = searchObj[key];
            break;
          case 'content':
            where['text'] = { contains: searchObj[key] };
            break;

          case 'type':
            where['type'] = searchObj[key];
            break;
          // 可以在这里添加更多的键名处理
        }
      });
    }

    const comments = await this.prisma.otherComment.findMany({
      where,
      skip: (dto.offset - 1) * dto.limits,
      take: dto.limits,
    });

    return {
      rows: comments,
      count: await this.prisma.otherComment.count({ where: where }),
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} otherComment`;
  // }

  findByType(dto: FindByTypeDto){
    return this.prisma.otherComment.findMany({
      where: {
        type: dto.type,
      },
    });
  }

  update(dto: updateDto) {
    return this.prisma.otherComment.update({
      where: {
        id: dto.id,
      },
      data: {
        status: dto.status,
      }
    })
  }

  remove(dto: deleteDto) {
    return this.prisma.otherComment.deleteMany({
      where: {
        id: {
          in: dto.id,
        },
      },
    });
  }
}