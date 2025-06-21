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

  @ManyToOne(() => User, (user) => user.messages, { nullable: false })
  @JoinColumn({ name: 'sender_id', referencedColumnName: 'id' })
  sender: User;

  @Column({ type: 'varchar', length: 255, nullable: false })
  subject: string;

  @Column({ type: 'text', nullable: false })
  body: string;

  @CreateDateColumn({ name: 'sent_at', type: 'timestamp with time zone' })
  sentAt: Date;

  @Column({ name: 'is_read', type: 'boolean', default: false })
  isRead: boolean;
}
