import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'Title must be a string' })
  @MaxLength(20)
  title: string;

  @IsString({ message: 'Description must be a string' })
  @MinLength(10)
  description: string;
}
