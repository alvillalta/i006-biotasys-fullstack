import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import config from './dotenv.config';

/**
 * Opciones de conexión para TypeORM
 */
export const ormConfig: TypeOrmModuleOptions & DataSourceOptions = {
  type: 'postgres',
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.name,
  schema: 'public',

  // Entidades y migraciones
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/**/*{.ts,.js}'],
  migrationsTableName: 'typeorm_migrations',

  // Sincronización y logging
  synchronize: config.nodeEnv === 'development', // Solo en desarrollo
  logging: config.db.logQueries ? ['query', 'error'] : ['error'],

  // Pool de conexiones
  poolSize: 10,
  connectTimeoutMS: 5000,

  // Migraciones
  migrationsRun: config.db.migrateData,

  // Opciones adicionales
  ssl: config.nodeEnv === 'production' ? { rejectUnauthorized: false } : false,
  dropSchema: process.env.DROP_SCHEMA === 'true', // Limpiar BD en inicio
  retryAttempts: 5,
  retryDelay: 3000,
};

export default ormConfig;
