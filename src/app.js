const express = require('express');
const itemsRouter = require('./routes/items');


const app = express();

app.use(express.json());

app.use('/emp', itemsRouter);


module.exports = app;