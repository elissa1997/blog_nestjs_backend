import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import * as crypto from "crypto";
import { lastValueFrom } from 'rxjs';
import { PrismaService } from '@/prisma/prisma.service';
import addDto from './dto/add.dto';
import findAllDto from './dto/findall.dto';
import deleteDto from './dto/delete.dto';
import updateDto from './dto/update.dto';

@Injectable()
export class CommentService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private httpService: HttpService,
  ) {}
  async create(dto: addDto) {
    let investigate = await this.sendCommentToQiniu(dto.text);
    console.log(investigate);
    if (investigate.code === 200 && investigate.result.suggestion === 'pass') {
        return this.prisma.comment.create({
          data: {
            a_id: dto.a_id,
            parent_id: dto.parent_id,
            is_regist: dto.is_regist,
            user_name: dto.user_name,
            email: dto.email,
            url: dto.url,
            ip: dto.ip,
            agant: dto.agant,
            text: dto.text,
            status: dto.status,
          }
        });
    }else{
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
          case 'articleTitle':
            where['article'] = { title: { contains: searchObj[key] } };
            break;
          // 可以在这里添加更多的键名处理
        }
      });
      
    }

    const comments = await this.prisma.comment.findMany({
      where,
      skip: (dto.offset - 1) * dto.limits,
      take: dto.limits,
      include: {
        article: {
          select: {
            id: true,
            title: true,
            status: true,
          },
        },
      },
    });

    return {
      rows: comments,
      count: await this.prisma.comment.count({ where: where }),
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(dto: updateDto) {
    return this.prisma.comment.update({
      where: {
        id: dto.id,
      },
      data: {
        status: dto.status,
      }
    })
  }

  remove(dto: deleteDto) {
    return this.prisma.comment.deleteMany({
      where: {
        id: {
          in: dto.id,
        },
      },
    });
  }

  // 评论发送至七牛内容审核接口
  async sendCommentToQiniu(commentText: string) {
    let host = 'ai.qiniuapi.com';
    let path = '/v3/text/censor';
    let body = {
      data: {
        text: commentText,
      },
      params: {
        scenes: [
          "antispam"
        ]
      }
    };
    let method = 'POST';
    let token = await this.getQiniuToken(host, path, JSON.stringify(body), method);
    const result = this.httpService.request({
      method: method,
      url: `https://${host}${path}`,
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
      data: body,
    })
    const checkResult: any = await lastValueFrom(result);
    return checkResult.data;
  }


    // 七牛生成鉴权接口
  async getQiniuToken(host: string, path: string, body: Object, method: string) {

    let access = undefined;
    access = method.toUpperCase() + ' ' + path;
    access += '\nHost: ' + host;
    access += '\nContent-Type: application/json';
    access += '\n\n';
    access += body;
    let hmac = crypto.createHmac('sha1', this.config.get('QINIU_SECRET_KEY'));
    hmac.update(access);
    let digest = hmac.digest('base64');

  
    let safeDigest = digest.replace(/\//g, '_').replace(/\+/g, '-');
    return 'Qiniu ' + this.config.get('QINIU_ACCESS_KEY') + ':' + safeDigest;
  }
}
