const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usersController');
const { actualizarUsuarioValidator, validarDatos } = require('../validator/usersValidator');

router.get('/', usuarioController.obtenerUsuarios);
router.get('/:id', usuarioController.obtenerUsuarioPorId);
router.put('/:id', actualizarUsuarioValidator(), validarDatos, usuarioController.actualizarUsuario);
router.delete('/:id', usuarioController.eliminarUsuario);

router.post('/:userId/productos-favoritos', usuarioController.agregarProductoFavorito);
router.post('/:userId/talleres-favoritos', usuarioController.agregarTallerFavorito);
router.post('/:userId/tiendas-favoritas', usuarioController.agregarTiendaFavorita);

module.exports = router;