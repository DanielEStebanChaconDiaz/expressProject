const express = require('express');
const mensajeController = require('../controller/messageController');
const { validarCrearMensaje } = require('../validator/messageValidator');

const router = express.Router();

router.post('/', validarCrearMensaje, mensajeController.crearMensaje);
router.get('/:id', mensajeController.obtenerMensaje);
router.get('/', mensajeController.listarMensajes);
router.get('/conversacion/:remitenteId/:receptorId', mensajeController.obtenerConversacion);
router.delete('/:id', mensajeController.eliminarMensaje);

module.exports = router;
