import { Controller, Get } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { MarcasAutosService } from './marcas-autos.service';
import { MarcaAutoDto } from './dto/marca-auto.dto';

@Controller('marcas-autos')
export class MarcasAutosController {
  constructor(private readonly marcasAutosService: MarcasAutosService) {}

  @Get()
  async findAll(): Promise<MarcaAutoDto[]> {
    const marcas = await this.marcasAutosService.findAll();

    return plainToInstance(MarcaAutoDto, marcas, {
      excludeExtraneousValues: true,
    });
  }
}
