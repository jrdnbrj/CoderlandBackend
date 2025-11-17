import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Repository } from 'typeorm';
import { MarcasAutosService } from './marcas-autos.service';
import { MarcaAuto } from './entities/marca-auto.entity';

// Aumentamos un poco el timeout global de este archivo
jest.setTimeout(10000);

/**
 * Entidad "gemela" para usar con SQLite en memoria.
 * Mantiene el mismo esquema lógico, pero con tipo 'datetime'
 * en lugar de 'timestamptz', que no es compatible con SQLite.
 */
@Entity({ name: 'MarcasAutos' })
class MarcaAutoSqlite {
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
    type: 'datetime', // compatible con SQLite
  })
  fechaCreacion: Date;
}

describe('MarcasAutosService con SQLite en memoria', () => {
  let moduleRef: TestingModule;
  let service: MarcasAutosService;
  let repository: Repository<MarcaAutoSqlite>;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [MarcaAutoSqlite],
          synchronize: true, // solo para testing
        }),
        TypeOrmModule.forFeature([MarcaAutoSqlite]),
      ],
    }).compile();

    repository = moduleRef.get<Repository<MarcaAutoSqlite>>(getRepositoryToken(MarcaAutoSqlite));

    service = new MarcasAutosService(repository as unknown as Repository<MarcaAuto>);

    // Seed inicial en la DB en memoria
    await repository.save([
      repository.create({
        nombre: 'Toyota',
        paisOrigen: 'Japón',
      }),
      repository.create({
        nombre: 'Ford',
        paisOrigen: 'Estados Unidos',
      }),
      repository.create({
        nombre: 'BMW',
        paisOrigen: 'Alemania',
      }),
    ]);
  });

  afterAll(async () => {
    if (moduleRef) {
      await moduleRef.close();
    }
  });

  it('debería obtener todas las marcas desde la base de datos en memoria', async () => {
    const marcas = await service.findAll();

    expect(marcas).toBeDefined();
    expect(marcas.length).toBeGreaterThanOrEqual(3);

    const nombres = marcas.map((m) => m.nombre).sort();
    expect(nombres).toEqual(['BMW', 'Ford', 'Toyota']);
  });
});
