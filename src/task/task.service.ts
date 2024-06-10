import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './task.repository';
@Injectable()
export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  getAllTasks(): Promise<Task[]> {
    return this.taskRepository.getAllTasks();
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  getTaskById(id: string): Promise<Task> {
    return this.taskRepository.getTaskById(id);
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.taskRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const taskToModify: Task = await this.getTaskById(id);

    const modifiedTask: Task = {
      ...taskToModify,
      ...updateTaskDto,
    };

    try {
      await this.taskRepository.save(modifiedTask);
      return modifiedTask;
    } catch (error) {
      throw new BadRequestException('Task could not be updated');
    }
  }
}
