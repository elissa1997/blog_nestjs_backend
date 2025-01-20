import { IsNotEmpty } from 'class-validator';

export default class FindByTypeDto {
  @IsNotEmpty({ message: '字典类型不能为空' })
  dict_type: string;
}