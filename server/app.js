const express = require('express');
const passport = require('passport');
const session = require('express-session');
const connectMongoDB = require('../server/config/config');
const facebookRoutes = require('../server/routes/facebookRoutes');
const googleRoutes = require('../server/routes/googleRoutes');
const emailRoutes = require('../server/routes/emailRoutes');
const phoneRoutes = require('../server/routes/phoneRoutes');
const usuarioRoutes = require('../server/routes/usersRoutes');
const tiendaRoutes = require('../server/routes/tiendaRoutes');
const tallerRoutes = require('../server/routes/tallerRoutes');
const pedidoRoutes = require('../server/routes/pedidoRoutes');
const path = require('path');
const https = require('https');
const fs = require('fs');
const setupChat = require('../server/services/chatBot'); // Importar el chatbot

const instagramRoutes = require('../server/routes/instagramRoutes'); 
const app = express();
//app.use(express.static(path.join(__dirname, '../public'))); // se activa para probar el chat bot en public
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
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/tiendas', tiendaRoutes);
app.use('/api/taller', tallerRoutes);
app.use('/api/pedido', pedidoRoutes);
app.use(instagramRoutes);

const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, 'private.key')),
    cert: fs.readFileSync(path.join(__dirname, 'certificate.crt'))
};

const server = https.createServer(sslOptions, app);

// Configurar el chatbot
setupChat(server);

server.listen({
    host: process.env.EXPRESS_HOST || 'localhost',
    port: process.env.PORT || 3000
}, () => {
    console.log(`Servidor HTTPS corriendo en: https://localhost:${process.env.PORT || 3000}`);
});
