"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerUi = exports.specs = void 0;
// const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Swagger Express API',
            version: '1.0.0',
            description: 'A simple Express API with Swagger documentation',
        },
        servers: [
            {
                // url: 'https://nutech-production-9671.up.railway.app/',
                url: 'https://backend-nodejs-eta.vercel.app/',
                // url: 'http://localhost:3007/',        
            }
        ],
    },
    apis: ['./src/routes/*.ts',],
};
exports.specs = (0, swagger_jsdoc_1.default)(options);
exports.swaggerUi = swagger_ui_express_1.default;
// module.exports = {
//   specs,
//   swaggerUi,
// };
