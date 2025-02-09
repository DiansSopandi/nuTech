"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
dotenv_1.default.config();
const isVercel = process.env.VERCEL === "1"; // Detect Vercel environment
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
console.log('✅ in AppDataSource...(AppDataSource)');
exports.AppDataSource = new typeorm_1.DataSource({
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
//# sourceMappingURL=dataSource.js.map