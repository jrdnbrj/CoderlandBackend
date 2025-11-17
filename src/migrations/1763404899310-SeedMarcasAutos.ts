import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedMarcasAutos1731872000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "MarcasAutos" ("nombre", "pais_origen")
      VALUES
        ('Toyota', 'Japón'),
        ('Honda', 'Japón'),
        ('Ford', 'Estados Unidos');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "MarcasAutos"
      WHERE "nombre" IN ('Toyota', 'Honda', 'Ford');
    `);
  }
}
