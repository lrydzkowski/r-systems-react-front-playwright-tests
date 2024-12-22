import dotenv from 'dotenv';
import path from 'path';

export const loadEnvConfig = () => {
  const environment = process.env.NODE_ENV || null;
  const fileName = environment ? `.env.${environment}` : '.env';
  const envPath = path.resolve(process.cwd(), fileName);
  dotenv.config({ path: envPath });

  return {
    baseUrl: process.env.BASE_URL!,
    userEmail: process.env.USER_EMAIL!,
    userPassword: process.env.USER_PASSWORD!,
  };
};

export type EnvConfig = ReturnType<typeof loadEnvConfig>;
