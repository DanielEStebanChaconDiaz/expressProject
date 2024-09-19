const express = require('express');
const passport = require('passport');
const session = require('express-session');
const connectMongoDB = require('../server/config/config');
const facebookRoutes = require('../server/routes/facebookRoutes');
const googleRoutes = require('../server/routes/googleRoutes');
const emailRoutes = require('../server/routes/emailRoutes');
const phoneRoutes = require('../server/routes/phoneRoutes');
const shopRoutes= require('../server/routes/shopRoutes')
const path = require('path');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');

const instagramRoutes = require('../server/routes/instagramRoutes');
const app = express();
//const path = require('path');
require('dotenv').config();

connectMongoDB();
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(facebookRoutes);
app.use(googleRoutes);
app.use(emailRoutes);
app.use(phoneRoutes);

app.use(bodyParser.json());
app.use('/api', shopRoutes);



app.use(passport.initialize());
app.use(passport.session());

app.use(instagramRoutes);

const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, 'private.key')),
    cert: fs.readFileSync(path.join(__dirname, 'certificate.crt'))
};

https.createServer(sslOptions, app).listen({
    host: process.env.EXPRESS_HOST || 'localhost',
    port: process.env.PORT || 3000
}, () => {
    console.log(`Servidor HTTPS corriendo en: https://localhost:${process.env.PORT || 3000}`);
});
