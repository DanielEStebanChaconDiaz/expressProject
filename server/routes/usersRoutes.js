const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usersController');
const { actualizarUsuarioValidator, validarDatos } = require('../validator/usersValidator');


router.get('/', usuarioController.obtenerUsuarios);
router.get('/:id', usuarioController.obtenerUsuarioPorId);
router.put('/:id',actualizarUsuarioValidator(), validarDatos, usuarioController.actualizarUsuario);
router.delete('/:id', usuarioController.eliminarUsuario);

module.exports = router;
