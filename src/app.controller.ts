import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api') // Nota: la ruta base será /api
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hola') // Ahora la ruta completa será /api/hola
  getHola(): any {
    return { mensaje: this.appService.getHello() };
  }
}
