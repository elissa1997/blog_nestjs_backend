// src/common/qiniu.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { QiniuInvestigate } from './qiniu.investigate';

@Module({
  imports: [HttpModule, ConfigModule], // 导入 HttpModule 和 ConfigModule
  providers: [QiniuInvestigate],
  exports: [QiniuInvestigate], // 导出 QiniuInvestigate 服务
})
export class QiniuModule {}