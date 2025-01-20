import { IsNotEmpty } from 'class-validator';

export default class FindByTypeDto {
  @IsNotEmpty()
  type: number;
}