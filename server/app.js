const express = require('express');
const passport = require('passport');
const session = require('express-session');
const connectMongoDB = require('../server/config/config');
const facebookRoutes = require('../server/routes/facebookRoutes');
const googleRoutes = require('../server/routes/googleRoutes');
const authRoutes = require('../server/routes/authRoutes');
const phoneRoutes = require('../server/routes/phoneRoutes');
const app = express();
//const path = require('path');
require('dotenv').config();


connectMongoDB();
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  }));
app.use(passport.initialize());
app.use(passport.session());
app.use(facebookRoutes);
app.use(googleRoutes);
app.use(authRoutes);
app.use(phoneRoutes);


app.listen({
    host: process.env.EXPRESS_HOST || 'localhost', 
    port: process.env.PORT || 3000
}, () => {
    console.log(`Servidor corriendo en: http://localhost:${process.env.PORT || 3000}`);
});