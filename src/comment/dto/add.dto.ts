import { IsNotEmpty } from 'class-validator';

export default class addDto {
  @IsNotEmpty({ message: '文章关联id不能为空' })
  a_id: number;

  @IsNotEmpty({ message: '父级id不能为空' })
  parent_id: number;

  @IsNotEmpty({ message: '是否为注册用户不能为空' })
  is_regist: number;

  @IsNotEmpty({ message: '用户名不能为空' })
  user_name: string;

  @IsNotEmpty({ message: '邮箱不能为空' })
  email: string;

  url: string;

  // 新增属性
  ip: string;

  agant: string;

  @IsNotEmpty({ message: '评论内容不能为空' })
  text: string;

  @IsNotEmpty({ message: '状态不能为空' })
  status: number;
}