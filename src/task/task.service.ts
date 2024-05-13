import { Injectable } from '@nestjs/common';
import { Task } from './types/task.type';
import { TaskStatus } from './types/task-status.type';

@Injectable()
export class TaskService {
  tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(task) {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      status: TaskStatus.OPEN,
    };
    console.log(newTask);
  }
}
