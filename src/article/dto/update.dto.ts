import { PartialType } from '@nestjs/mapped-types';
import addDto from './add.dto';
import { IsNotEmpty } from 'class-validator';

export default class updateDto extends PartialType(addDto) {
  @IsNotEmpty({ message: '文章ID不能为空' })
  a_id: number;
}
