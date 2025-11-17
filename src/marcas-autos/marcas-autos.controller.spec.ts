import { Test, TestingModule } from '@nestjs/testing';
import { MarcasAutosController } from './marcas-autos.controller';
import { MarcasAutosService } from './marcas-autos.service';
import { MarcaAuto } from './entities/marca-auto.entity';

describe('MarcasAutosController', () => {
  let controller: MarcasAutosController;

  const marcasMock: MarcaAuto[] = [
    {
      id: 1,
      nombre: 'Toyota',
      paisOrigen: 'Japón',
      fechaCreacion: new Date('2024-01-01'),
    } as MarcaAuto,
    {
      id: 2,
      nombre: 'Ford',
      paisOrigen: 'Estados Unidos',
      fechaCreacion: new Date('2024-01-02'),
    } as MarcaAuto,
  ];

  const findAllMock = jest.fn().mockResolvedValue(marcasMock);

  const mockMarcasAutosService: Pick<MarcasAutosService, 'findAll'> = {
    findAll: findAllMock,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarcasAutosController],
      providers: [
        {
          provide: MarcasAutosService,
          useValue: mockMarcasAutosService,
        },
      ],
    }).compile();

    controller = module.get<MarcasAutosController>(MarcasAutosController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('findAll() debería delegar en el servicio y retornar el resultado', async () => {
    const result = await controller.findAll();

    expect(findAllMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual(marcasMock);
  });
});
