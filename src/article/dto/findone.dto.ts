import { IsNotEmpty } from 'class-validator';

export default class findOneDto {
  @IsNotEmpty({ message: '文章id不能为空' })
  a_id: number;
}