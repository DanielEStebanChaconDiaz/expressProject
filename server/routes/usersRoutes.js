const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usersController');
const { registerUserValidator, registerUserByPhoneValidator, actualizarUsuarioValidator, validarDatos } = require('../validator/usersValidator');
const { upload } = require('../config/cloudinaryConfig');

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ mensaje: 'No autorizado' });
  };


router.get('/me', usuarioController.obtenerUsuarioLogueado); 
router.post('/login', usuarioController.login);

router.post('/register', registerUserValidator(), validarDatos, usuarioController.registerUser);
router.post('/register-phone', registerUserByPhoneValidator(), validarDatos, usuarioController.registerUserByPhone);
router.get('/', usuarioController.obtenerUsuarios); 
router.get('/:id', usuarioController.obtenerUsuarioPorId); 
router.put('/:id', actualizarUsuarioValidator(), validarDatos, usuarioController.actualizarUsuario); 
router.delete('/:id', usuarioController.eliminarUsuario); 
router.post('/:userId/productos-favoritos', usuarioController.agregarProductoFavorito); 
router.post('/:userId/talleres-favoritos', usuarioController.agregarTallerFavorito); 
router.post('/:userId/tiendas-favoritas', usuarioController.agregarTiendaFavorita); 
router.post('/:id/foto-perfil', upload.single('fotoPerfil'), usuarioController.actualizarFotoPerfil); 
router.put('/:id', upload.single('fotoPerfil'), actualizarUsuarioValidator(), validarDatos, usuarioController.actualizarUsuario);
router.post('/logout', usuarioController.logout);

module.exports = router;