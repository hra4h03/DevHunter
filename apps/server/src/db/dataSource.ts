import { config } from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

config({ path: join(process.cwd(), '../../.env') });

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [join(process.cwd(), './dist/**/*.entity.js')],
    logging: 'all',
    migrationsTableName: 'migrations',
    migrations: [join(process.cwd(), './dist/db/migrations/*.js')],
    namingStrategy: new SnakeNamingStrategy(),
};

export default new DataSource(dataSourceOptions);
