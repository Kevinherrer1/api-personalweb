import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { Technology } from '../technologies/entities/technology.entity';

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(ProjectsService.name);

  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Technology)
    private readonly technologyRepository: Repository<Technology>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const { technologyIds, ...projectDetails } = createProjectDto;
    let technologies: Technology[] = [];
    if (technologyIds && technologyIds.length > 0) {
      technologies = await this.technologyRepository.findBy({
        id: In(technologyIds),
      });
      if (technologies.length !== technologyIds.length) {
        throw new NotFoundException('One or more technologies were not found.');
      }
    }

    const project = this.projectRepository.create({
      ...projectDetails,
      technologies,
    });

    return this.projectRepository.save(project);
  }

  async findAll() {
    return this.projectRepository.find({ relations: ['technologies'] });
  }

  async seed() {
    this.logger.log('Seeding projects...');
    await this.projectRepository.query(
      'TRUNCATE TABLE "projects" RESTART IDENTITY CASCADE',
    );
    this.logger.log('Old projects cleared.');

    const projectsToCreate = [
      {
        title: 'JuegoDamas_Q-Learning',
        description:
          'Implementación de un agente autónomo capaz de jugar Damas en un tablero reducido de 4x4, utilizando el algoritmo Q-learning para mejorar su rendimiento a medida que juega más partidas.',
        repositoryUrl: 'https://github.com/Kevinherrer1/JuegoDamas_Q-Learning',
      },
      {
        title: 'JuegoDamas_Agente',
        description:
          'Juego de Damas implementado en Python, donde puedes jugar contra una Inteligencia Artificial (IA) utilizando el algoritmo Minimax.',
        repositoryUrl: 'https://github.com/Kevinherrer1/JuegoDamas_Agente',
      },
      {
        title: 'ProyectoIO_IA',
        description:
          'Este repositorio contiene un script en Python que utiliza un modelo de aprendizaje automático para predecir el tiempo de entrega en un servicio de delivery.',
        repositoryUrl: 'https://github.com/Kevinherrer1/ProyectoIO_IA',
      },
      {
        title: 'Proyecto-Cassandra',
        description:
          'Sistema de gestión de supermercado desarrollado con Flask y Cassandra. Permite la gestión de clientes, productos y facturas.',
        repositoryUrl: 'https://github.com/Callaquenoveo/Proyecto-Cassandra',
      },
    ];

    for (const projectDto of projectsToCreate) {
      const project = this.projectRepository.create(projectDto);
      await this.projectRepository.save(project);
    }

    this.logger.log('Seeding projects completed.');
    return { message: 'Seeding projects completed.' };
  }
} 