const swaggerJsdoc = require("swagger-jsdoc");
require("dotenv").config();

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Items API",
      version: "1.0.0",
      description: "Basic CRUD API documentation",
    },
    servers:
      process.env.NODE_ENV === "Localhost"
        ? [
            {
              url: "http://localhost:4000",
              description: "Local server",
            },
          ]
        : [
            {
              url: "https://basic-crud-nodejs.vercel.app",
              description: "Production server",
            },
          ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
