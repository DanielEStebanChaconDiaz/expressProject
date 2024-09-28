const express = require('express');
const passport = require('passport');
const session = require('express-session');
const connectMongoDB = require('../server/config/config');
const facebookRoutes = require('../server/routes/facebookRoutes');
const googleRoutes = require('../server/routes/googleRoutes');
const usuarioRoutes = require('../server/routes/usersRoutes');
const couponRoutes = require('../server/routes/couponRoutes')
const messagesRoutes = require('../server/routes/messageRoutes')
const tiendaRoutes = require('./routes/shopRoutes');
const tallerRoutes = require('./routes/workshopRoutes');
const pedidoRoutes = require('./routes/orderRoutes');
const productoRoutes = require('./routes/productRoutes');
const talleryproductoRoutes = require('./routes/talleryproductoRoutes');
const path = require('path');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const discordRoutes = require('./routes/discordRoutes');
const cors = require('cors');
const socketIo = require('socket.io');
const updateSessionUser = require('../server/utils/updateMiddleware');
const app = express();
const multer = require('multer');
const setupChat = require('../server/services/chatBot');

require('dotenv').config();

connectMongoDB();

app.use(cors({
    origin: 'https://localhost:5000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 } // 24 horas
  }));
  
app.use(passport.initialize());
app.use(passport.session());
app.use(updateSessionUser);
app.use(facebookRoutes);
app.use(googleRoutes);
app.use(discordRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/cupones', couponRoutes)
app.use('/api/mensajes', messagesRoutes)
app.use('/api/tiendas', tiendaRoutes);
app.use('/api/talleres', tallerRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/talleryproductos', talleryproductoRoutes);
app.use(bodyParser.json());

app.use((err, req, res, next) => {
    console.error(err.stack);
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: 'Error en la carga de archivos: ' + err.message });
    }
    res.status(500).json({ message: 'Error interno del servidor' });
});


const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, 'private.key')),
    cert: fs.readFileSync(path.join(__dirname, 'certificate.crt'))
};

const server = https.createServer(sslOptions, app);

const io = socketIo(server, {
    cors: {
        origin: "https://localhost:5000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

setupChat(io);

server.listen({
    host: process.env.EXPRESS_HOST || 'localhost',
    port: process.env.PORT || 3000
}, () => {
    console.log(`Servidor HTTPS corriendo en: https://localhost:${process.env.PORT || 3000}`);
});