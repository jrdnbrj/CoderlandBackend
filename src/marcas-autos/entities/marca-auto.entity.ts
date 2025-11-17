import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'MarcasAutos' })
export class MarcaAuto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'nombre',
    type: 'varchar',
    length: 100,
    unique: true,
  })
  nombre: string;

  @Column({
    name: 'pais_origen',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  paisOrigen?: string;

  @CreateDateColumn({
    name: 'fecha_creacion',
    type: 'timestamptz',
  })
  fechaCreacion: Date;
}
