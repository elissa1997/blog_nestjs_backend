import { IsNotEmpty } from 'class-validator';

export default class addDto {

  @IsNotEmpty({ message: '标题不能为空' })
  title: string;

  cover: string;
  
  @IsNotEmpty({ message: '文章内容不能为空' })
  content: string;

  @IsNotEmpty({ message: '分类不能为空' })
  category: number;

  @IsNotEmpty({ message: '状态不能为空' })
  status: number;
}