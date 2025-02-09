import dotenv from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

dotenv.config();

const isVercel = process.env.VERCEL === "1"; // Detect Vercel environment
console.log(' ✅ in AppDataSource...');

const postgresConfig = {
   // railway
	// username: process.env.DB_USERNAME,
	// password: process.env.DB_PASSWORD,
	// host: process.env.DB_HOST,
	// port: Number(process.env.DB_PORT),
	// database: process.env.DB_NAME,
   
   // vercel
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	host: process.env.POSTGRES_HOST,
	port: Number(process.env.DB_PORT),
	database: process.env.POSTGRES_DATABASE,
};

export const AppDataSource = new DataSource({
   ...postgresConfig,
   type: 'postgres',
   synchronize: true,
   logging: false,
   ssl: { rejectUnauthorized: false }, // Ensure SSL is enabled
   // ssl: isVercel ? { rejectUnauthorized: false } : false, // Important for Vercel DB
   entities: ['src/entities/**/*.entity.ts'],
   migrations: ['src/migrations/**/*.ts'],
   subscribers: ['src/subscribers/**/*.ts'],
});