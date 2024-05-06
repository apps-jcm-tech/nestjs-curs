import { Injectable } from '@nestjs/common';
import { Task } from './types/task.type';

@Injectable()
export class TaskService {
  tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }
}
