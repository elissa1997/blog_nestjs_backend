import { IsNotEmpty } from 'class-validator';
import { IsExists } from '@/common/rules/is-exists.rules';
export default class LoginDto {
    // 用户名
    @IsNotEmpty({ message: '用户名不能为空' })
    @IsExists('user', { message: '账号不存在' })
    name: string;
    // 密码
    @IsNotEmpty({ message: '密码不能为空' })
    password: string;
}