import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MarcaAuto } from './entities/marca-auto.entity';
import { MarcasAutosService } from './marcas-autos.service';
import { MarcasAutosController } from './marcas-autos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MarcaAuto])],
  controllers: [MarcasAutosController],
  providers: [MarcasAutosService],
  exports: [MarcasAutosService],
})
export class MarcasAutosModule {}
