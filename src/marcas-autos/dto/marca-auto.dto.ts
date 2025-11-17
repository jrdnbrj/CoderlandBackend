import { Expose } from 'class-transformer';

export class MarcaAutoDto {
  @Expose()
  id: number;

  @Expose()
  nombre: string;

  @Expose()
  paisOrigen?: string;

  @Expose()
  fechaCreacion: Date;
}
