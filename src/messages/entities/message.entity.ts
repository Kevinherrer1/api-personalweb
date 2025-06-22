import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'sender_id' })
  sender: User;

  @Column({ type: 'text', nullable: false })
  content: string;

  @CreateDateColumn({ name: 'sent_at', type: 'timestamp with time zone' })
  sentAt: Date;

  @Column({ default: false })
  isRead: boolean;
}
