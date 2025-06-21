import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Technology } from './entities/technology.entity';
import { CreateTechnologyDto } from './dto/create-technology.dto';

@Injectable()
export class TechnologiesService {
  private readonly logger = new Logger(TechnologiesService.name);

  constructor(
    @InjectRepository(Technology)
    private readonly technologyRepository: Repository<Technology>,
  ) {}

  async create(createTechnologyDto: CreateTechnologyDto) {
    const technology = this.technologyRepository.create(createTechnologyDto);
    return this.technologyRepository.save(technology);
  }

  async findAll() {
    return this.technologyRepository.find();
  }

  async seed() {
    this.logger.log('Clearing old technologies and re-seeding...');

    // Use a raw query with CASCADE to handle foreign key constraints
    await this.technologyRepository.query(
      'TRUNCATE TABLE "technologies" RESTART IDENTITY CASCADE',
    );
    this.logger.log('Old technologies cleared.');

    const technologiesToCreate = [
      // Desarrollo de aplicaciones web
      {
        name: 'Vue',
        category: 'Desarrollo de aplicaciones web',
        iconUrl: 'vue-icon.png',
      },
      {
        name: 'Laravel',
        category: 'Desarrollo de aplicaciones web',
        iconUrl: 'laravel-icon.png',
      },

      // Conocimientos en lenguajes de programación
      {
        name: 'PHP',
        category: 'Conocimientos en lenguajes de programación',
        iconUrl: 'php-icon.png',
      },
      {
        name: 'JavaScript',
        category: 'Conocimientos en lenguajes de programación',
        iconUrl: 'javascript-icon.png',
      },
      {
        name: 'Python',
        category: 'Conocimientos en lenguajes de programación',
        iconUrl: 'python-icon.png',
      },

      // Experiencia en manejo de bases de datos
      {
        name: 'PostgreSQL',
        category: 'Experiencia en manejo de bases de datos',
        iconUrl: 'postgres-icon.png',
      },
      {
        name: 'MySQL',
        category: 'Experiencia en manejo de bases de datos',
        iconUrl: 'mysql-icon.png',
      },
      {
        name: 'Cassandra',
        category: 'Experiencia en manejo de bases de datos',
        iconUrl: 'cassandra-icon.png',
      },

      // Manejo de diversos entornos
      {
        name: 'Ubuntu',
        category: 'Manejo de diversos entornos',
        iconUrl: 'ubuntu-icon.png',
      },
      {
        name: 'Windows',
        category: 'Manejo de diversos entornos',
        iconUrl: 'windows-icon.png',
      },
    ];

    for (const tech of technologiesToCreate) {
      const technology = this.technologyRepository.create(tech);
      await this.technologyRepository.save(technology);
    }

    this.logger.log('Seeding technologies completed.');
    return { message: 'Seeding completed successfully.' };
  }
}
