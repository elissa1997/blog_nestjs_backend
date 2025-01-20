import { IsNotEmpty } from 'class-validator';

export default class findAllDto {
  @IsNotEmpty({ message: '页码不能为空' })
  offset: number;

  @IsNotEmpty({ message: '每页数量不能为空' })
  limits: number;

  dict_type: string;
}