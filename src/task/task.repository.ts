import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.find();
  }

  async createTask(creatTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = creatTaskDto;
    const task = this.create({ title, description });

    try {
      await this.save(task);
      return task;
    } catch (error) {
      throw new BadRequestException('Task could not be created');
    }
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.findOneBy({ id });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }
}
