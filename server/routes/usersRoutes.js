const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usersController');
const { registerUserValidator, registerUserByPhoneValidator, actualizarUsuarioValidator, validarDatos } = require('../validator/usersValidator');
const { upload } = require('../config/cloudinaryConfig');
const authMiddleware = require('../utils/authMiddleware');

router.get('/me', authMiddleware, usuarioController.obtenerUsuarioLogueado);
router.post('/login', usuarioController.login);
router.post('/register', registerUserValidator(), validarDatos, usuarioController.registerUser);
router.post('/register-phone', registerUserByPhoneValidator(), validarDatos, usuarioController.registerUserByPhone);
router.get('/', authMiddleware, usuarioController.obtenerUsuarios);
router.get('/:id', authMiddleware, usuarioController.obtenerUsuarioPorId);
router.put('/:id', authMiddleware, actualizarUsuarioValidator(), validarDatos, usuarioController.actualizarUsuario);
router.delete('/:id', authMiddleware, usuarioController.eliminarUsuario);
router.post('/:userId/productos-favoritos', authMiddleware, usuarioController.agregarProductoFavorito);
router.post('/:userId/talleres-favoritos', authMiddleware, usuarioController.agregarTallerFavorito);
router.post('/:userId/tiendas-favoritas', authMiddleware, usuarioController.agregarTiendaFavorita);
router.post('/:id/foto-perfil', authMiddleware, upload.single('fotoPerfil'), usuarioController.actualizarFotoPerfil);
router.put('/:id', authMiddleware, upload.single('fotoPerfil'), actualizarUsuarioValidator(), validarDatos, usuarioController.actualizarUsuario);
router.post('/logout', authMiddleware, usuarioController.logout);
router.post('/carrito/agregar', authMiddleware, usuarioController.agregarAlCarrito);
router.delete('/carrito/remover/:itemId', authMiddleware, usuarioController.removerDelCarrito);
// router.get('/carrito', authMiddleware, usuarioController.obtenerCarrito);
router.post('/carrito/canjear-cupon', authMiddleware, usuarioController.canjearCupon);
router.post('/carrito/usar-cupon', authMiddleware, usuarioController.usarCupon);
router.post('/comprar', authMiddleware, usuarioController.realizarCompra);

module.exports = router;