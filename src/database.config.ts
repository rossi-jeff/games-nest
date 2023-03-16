import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default function (): TypeOrmModuleOptions {
  return {
    type: 'mysql',
    host: process.env.TYPEORM_HOST,
    port: 3306,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [process.env.TYPEORM_ENTITIES],
    logging: ['error'],
    synchronize: false,
  };
}
