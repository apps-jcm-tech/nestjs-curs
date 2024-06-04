import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './types/task-status.type';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ enum: TaskStatus, type: 'enum', default: TaskStatus.OPEN })
  status: TaskStatus;
}
