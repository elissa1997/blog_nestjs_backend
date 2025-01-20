import { IsNotEmpty } from 'class-validator';

export class FindByTypeDto {
  @IsNotEmpty()
  type: number;
}