import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './types/task.type';
import { TaskStatus } from './types/task-status.type';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class TaskService {
  tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(task): Task {
    const newTask: Task = {
      ...task,
      id: uuidv4(),
      status: TaskStatus.OPEN,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  getTaskById(id: string): Task {
    const task: Task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;
  }

  deleteTask(id: string): void {
    this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTask(id: string, task): Task {
    const taskToModify: Task = this.getTaskById(id);

    const modifiedTask: Task = {
      ...taskToModify,
      ...task,
    };

    this.deleteTask(id);

    this.tasks.push(modifiedTask);

    return modifiedTask;
  }
}
