import { TaskStatus } from './task-status.type';

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
};
