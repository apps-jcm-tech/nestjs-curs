import { TaskService } from '../../task/task.service';
import { Test } from '@nestjs/testing';
import { TaskRepository } from '../../task/task.repository';
import { NotFoundException } from '@nestjs/common';

describe('TaskService', () => {
  let taskService: TaskService;
  let taskRepository;

  const mockTaskRepository = () => ({
    getAllTasks: jest.fn(),
    delete: jest.fn(),
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TaskService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    taskService = module.get<TaskService>(TaskService);
    taskRepository = module.get<TaskRepository>(TaskRepository);
  });

  describe('getAllTasks', () => {
    it('calls taskRepository.getAllTasks and returns the result', async () => {
      taskRepository.getAllTasks.mockResolvedValue('someValue');
      const results = await taskService.getAllTasks();
      expect(results).toBe('someValue');
    });
  });

  describe('deleteTask', () => {
    it('calls taskRepository.deleteTask and returns void', async () => {
      taskRepository.delete.mockResolvedValue({ affected: 1 });
      const result = await taskService.deleteTask('k78934258794325798534');
      expect(result).toBeUndefined();
    });

    it('calls taskRepository.deleteTask and returns Exception', async () => {
      taskRepository.delete.mockResolvedValue({ affected: 0 });
      expect(taskService.deleteTask('k78934258794325798534')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
