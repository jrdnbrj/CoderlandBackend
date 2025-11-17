import { MigrationInterface, QueryRunner, Table, TableUnique } from 'typeorm';

export class InitMarcasAutos1731871234567 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'MarcasAutos',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'nombre',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'pais_origen',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'fecha_creacion',
            type: 'timestamptz',
            isNullable: false,
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createUniqueConstraint(
      'MarcasAutos',
      new TableUnique({
        name: 'UQ_MarcasAutos_nombre',
        columnNames: ['nombre'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('MarcasAutos', true);
  }
}
