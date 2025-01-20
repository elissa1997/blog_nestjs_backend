// src/common/services/qiniu.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import * as crypto from "crypto";
import { lastValueFrom } from 'rxjs';

@Injectable()
export class QiniuInvestigate {
  constructor(
    private config: ConfigService,
    private httpService: HttpService,
  ) {}

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