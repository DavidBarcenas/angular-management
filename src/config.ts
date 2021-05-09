import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  database: {
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    password: process.env.POSTGRES_PASSWORD,
    dbName: process.env.POSTGRES_DB,
  },
}));
