import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  name: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  connection: process.env.DATABASE_CONNECTION
}));
