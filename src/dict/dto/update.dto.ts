import { IsNotEmpty } from 'class-validator';

export class updateDto {
  @IsNotEmpty({ message: '字典id不能为空' })
  id: number;

  @IsNotEmpty({ message: '字典类型不能为空' })
  dict_type: string;

  @IsNotEmpty({ message: '名称不能为空' })
  name: string;

  @IsNotEmpty({ message: '值不能为空' })
  value: number;
}