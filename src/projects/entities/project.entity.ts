import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable,
} from 'typeorm';
import { Technology } from '../../technologies/entities/technology.entity';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'project_url', type: 'varchar', length: 255, nullable: true })
  projectUrl: string;

  @Column({
    name: 'repository_url',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  repositoryUrl: string;

  @Column({ name: 'image_url', type: 'varchar', length: 255, nullable: true })
  imageUrl: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;

  @ManyToMany(() => Technology, (technology) => technology.projects)
  @JoinTable({
    name: 'project_technologies',
    joinColumn: {
      name: 'project_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'technology_id',
      referencedColumnName: 'id',
    },
  })
  technologies: Technology[];
}
