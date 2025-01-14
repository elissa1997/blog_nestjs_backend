import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import updateDto from './dto/update.dto';
import findAllDto from './dto/findall.dto';
import findOneDto from './dto/findone.dto';
import addDto from './dto/add.dto';
import deleteDto from './dto/delete.dto';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}
  create(dto: addDto) {
    return this.prisma.article.create({
      data: {
        title: dto.title,
        cover: dto.cover,
        content: dto.content,
        category: dto.category,
        status: dto.status,
      }
    });
  }

  async findAll(dto: findAllDto) {

    let where = {};
    
    if (dto.search) {
      let searchObj = JSON.parse(dto.search);
      
      where = Object.entries(searchObj).reduce((acc, [key, value]) => {
        if (key === 'title' && value !== undefined) {
          acc[key] = { contains: value };
        } else if ((key === 'category' || key === 'status') && value !== undefined) {
          // 使用类型断言将 value 断言为 string 类型
          acc[key] = parseInt(value as string, 10);
        }
        return acc;
      }, {});
      
    }
    
    const articles = await this.prisma.article.findMany({
      where: where,
      skip: (dto.offset - 1) * dto.limits,
      take: dto.limits,
    })

    return {
      rows: articles,
      count: await this.prisma.article.count({ where: where }),
    };
  }

  findOne(dto: findOneDto) {
    return this.prisma.article.findUnique({
      where: {
        id: dto.a_id,
      }
    })
    ;
  }

  update(dto: updateDto) {
    return this.prisma.article.update({
      where: {
        id: dto.a_id,
      },
      data: {
        title: dto.title,
        cover: dto.cover,
        content: dto.content,
        category: dto.category,
        status: dto.status
      }
    })
    // return `This action updates a #${id} article`;
  }

  remove(dto: deleteDto) {
    return this.prisma.article.deleteMany({
      where: {
        id: {
          in: dto.id,
        },
      },
    });
  }
}
