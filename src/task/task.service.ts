import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './task.repository';
@Injectable()
export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  tasks: Task[] = [];

  getAllTasks(): Promise<Task[]> {
    return this.taskRepository.getAllTasks();
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  getTaskById(id: string): Promise<Task> {
    return this.taskRepository.getTaskById(id);
  }

  deleteTask(id: string): void {
    this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const taskToModify: Task = await this.getTaskById(id);

    const modifiedTask: Task = {
      ...taskToModify,
      ...updateTaskDto,
    };

    this.deleteTask(id);

    this.tasks.push(modifiedTask);

    return modifiedTask;
  }
}
