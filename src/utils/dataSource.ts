import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import { DataSource } from 'typeorm';


const postgresConfig = {
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	database: process.env.DB_NAME,
};

export const AppDataSource = new DataSource({
   ...postgresConfig,
   type: 'postgres',
   synchronize: true,
   logging: false,
   entities: ['src/entities/**/*.entity.ts'],
   migrations: ['src/migrations/**/*.ts'],
   subscribers: ['src/subscribers/**/*.ts'],
});