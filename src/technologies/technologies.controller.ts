import { Controller, Get, Post, Body } from '@nestjs/common';
import { TechnologiesService } from './technologies.service';
import { CreateTechnologyDto } from './dto/create-technology.dto';

@Controller('technologies')
export class TechnologiesController {
  constructor(private readonly technologiesService: TechnologiesService) {}

  @Post('seed')
  seed() {
    return this.technologiesService.seed();
  }

  @Post()
  create(@Body() createTechnologyDto: CreateTechnologyDto) {
    return this.technologiesService.create(createTechnologyDto);
  }

  @Get()
  findAll() {
    return this.technologiesService.findAll();
  }
}
