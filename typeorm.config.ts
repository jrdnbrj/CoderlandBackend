import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config as loadEnv } from 'dotenv';
import { MarcaAuto } from './src/marcas-autos/entities/marca-auto.entity';

// Cargar variables de entorno desde .env
loadEnv();

const isSslEnabled = (process.env.DB_SSL ?? 'false').toLowerCase() === 'true';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [MarcaAuto],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  ssl: isSslEnabled ? { rejectUnauthorized: false } : false,
});

// 👇 sólo una exportación de DataSource
export default dataSource;
