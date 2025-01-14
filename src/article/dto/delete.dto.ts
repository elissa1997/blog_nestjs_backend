import { IsNotEmpty } from 'class-validator';

export default class deleteDto {
  @IsNotEmpty({ message: '删除id不能为空' })
  id: Array<number>;
} 