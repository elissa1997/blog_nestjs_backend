import { IsNotEmpty } from 'class-validator';

export default class FindByTypeDto {
  @IsNotEmpty({ message: '类型不能为空' })
  type: number;
}