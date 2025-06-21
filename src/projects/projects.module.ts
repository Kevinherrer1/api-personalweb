import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Technology } from '../technologies/entities/technology.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Technology])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
