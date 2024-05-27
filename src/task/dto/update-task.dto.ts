import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TaskStatus } from '../types/task-status.type';

export class UpdateTaskDto {
  @IsString({ message: 'Title must be a string' })
  @MaxLength(20)
  @IsOptional()
  title?: string;

  @IsString({ message: 'Description must be a string' })
  @MinLength(10)
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}
