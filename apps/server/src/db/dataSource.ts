import { config } from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

config();

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [join(process.cwd(), './dist/**/*.entity.js')],
    logging: true,
    seeds: [
        join(process.cwd(), './src/db/seeding/**/*.seed.ts'),
        join(process.cwd(), './dist/db/seeding/**/*.seed.js'),
    ],
    migrationsTableName: 'migrations',
    migrations: [join(process.cwd(), './dist/db/migrations/*.js')],
    namingStrategy: new SnakeNamingStrategy(),
};

export default new DataSource(dataSourceOptions);
