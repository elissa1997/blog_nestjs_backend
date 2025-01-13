import { IsInt, IsNotEmpty } from 'class-validator';
import { IsNotExists } from '../../common/rules/is-not-exists.rules';
export default class RegisterDto {
    // 用户名
    @IsNotEmpty({ message: '用户名不能为空' })
    @IsNotExists('user', { message: '用户名已存在' })
    name: string;
    // 密码
    @IsNotEmpty({ message: '密码不能为空' })
    password: string;
    // 邮箱
    @IsNotExists('user', { message: '邮箱已存在' })
    @IsNotEmpty({ message: '邮箱不能为空' })
    email: string;
    // 是否是管理员
    @IsNotEmpty({ message: '是否是管理员不能为空' })
    admin: number;
}