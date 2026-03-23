const express = require('express');
const itemsRouter = require('./routes/items');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');


const app = express();

app.use(express.json());

app.use('/emp', itemsRouter);

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec));
app.get('/api-docs/', swaggerUi.setup(swaggerSpec));

module.exports = app;