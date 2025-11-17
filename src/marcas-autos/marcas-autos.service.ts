import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MarcaAuto } from './entities/marca-auto.entity';

@Injectable()
export class MarcasAutosService {
  constructor(
    @InjectRepository(MarcaAuto)
    private readonly marcaAutoRepository: Repository<MarcaAuto>,
  ) {}

  async findAll(): Promise<MarcaAuto[]> {
    return this.marcaAutoRepository.find({
      order: { nombre: 'ASC' },
    });
  }
}
