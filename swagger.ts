// const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');
import  swaggerJsdoc from "swagger-jsdoc";
import SwaggerUi from "swagger-ui-express";

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
        url: 'https://nutech-production-9671.up.railway.app/',
      }
    ],
  },
  apis: ['./src/routes/*.ts',], 
};

export const specs = swaggerJsdoc(options);
export const swaggerUi = SwaggerUi;

// module.exports = {
//   specs,
//   swaggerUi,
// };