const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usersController');
const { registerUserValidator, registerUserByPhoneValidator, actualizarUsuarioValidator, validarDatos } = require('../validator/usersValidator');
const { upload } = require('../config/cloudinaryConfig');

function asegurarAutenticacion(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ mensaje: 'No autorizado' });
}


router.post('/register', registerUserValidator(), validarDatos, usuarioController.registerUser);
router.post('/register-phone', registerUserByPhoneValidator(), validarDatos, usuarioController.registerUserByPhone);
router.get('/', asegurarAutenticacion, usuarioController.obtenerUsuarios); 
router.get('/:id', asegurarAutenticacion, usuarioController.obtenerUsuarioPorId); 
router.get('/me', asegurarAutenticacion, usuarioController.obtenerUsuarioLogueado); 
router.put('/:id', asegurarAutenticacion, actualizarUsuarioValidator(), validarDatos, usuarioController.actualizarUsuario); 
router.delete('/:id', asegurarAutenticacion, usuarioController.eliminarUsuario); 
router.post('/:userId/productos-favoritos', asegurarAutenticacion, usuarioController.agregarProductoFavorito); 
router.post('/:userId/talleres-favoritos', asegurarAutenticacion, usuarioController.agregarTallerFavorito); 
router.post('/:userId/tiendas-favoritas', asegurarAutenticacion, usuarioController.agregarTiendaFavorita); 
router.post('/:id/foto-perfil', asegurarAutenticacion, upload.single('fotoPerfil'), usuarioController.actualizarFotoPerfil); 
router.put('/:id', asegurarAutenticacion, upload.single('fotoPerfil'), actualizarUsuarioValidator(), validarDatos, usuarioController.actualizarUsuario);
router.post('/logout', asegurarAutenticacion, usuarioController.logout);

module.exports = router;
