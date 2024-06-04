import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Module({
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
  imports: [TypeOrmModule.forFeature([Task])],
})
export class TaskModule {}
