import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MarcasAutosModule } from './marcas-autos/marcas-autos.module';

@Module({
  imports: [
    // Módulo de configuración: lee el archivo .env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Configuración de TypeORM usando las variables de entorno
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbPort = parseInt(configService.get<string>('DB_PORT') ?? '5432', 10);

        const sslEnabled =
          (configService.get<string>('DB_SSL') ?? 'false').toLowerCase() === 'true';

        return {
          type: 'postgres' as const,
          host: configService.get<string>('DB_HOST'),
          port: dbPort,
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),

          // Carga automática de entidades registradas con TypeOrmModule.forFeature
          autoLoadEntities: true,

          // Buenas prácticas: usar migraciones en lugar de synchronize en entornos serios
          synchronize: false,

          // Configuración SSL (por ejemplo para Supabase)
          ssl: sslEnabled ? { rejectUnauthorized: false } : false,
        };
      },
    }),

    MarcasAutosModule,
  ],
})
export class AppModule {}
