import { IsNotEmpty } from 'class-validator';

export default class addDto {
  @IsNotEmpty({ message: '字典类型不能为空' })
  dict_type: string;

  @IsNotEmpty({ message: '字典类型名称不能为空' })
  dict_type_name: string;

  @IsNotEmpty({ message: '名称不能为空' })
  name: string;

  @IsNotEmpty({ message: '值不能为空' })
  value: number;
}