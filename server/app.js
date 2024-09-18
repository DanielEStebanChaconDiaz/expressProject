const express = require('express');
const connectMongoDB = require('./server/config/config');
const app = express();
require('dotenv').config();


connectMongoDB();
app.use(express.json());

app.listen({
    host: process.env.EXPRESS_HOST || 'localhost', 
    port: process.env.PORT || 3000
}, () => {
    console.log(`Servidor corriendo en: http://localhost:${process.env.PORT || 3000}`);
});