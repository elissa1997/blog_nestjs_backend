import { IsNotEmpty } from 'class-validator';

export default class addDto {
  @IsNotEmpty({ message: '评论id不能为空' })
  id: number;

  @IsNotEmpty({ message: '状态不能为空' })
  status: number;
}