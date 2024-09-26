const express = require('express');
const cuponController = require('../controller/couponController');
const { validarCrearCupon, validarActualizarCupon } = require('../validator/couponsValidator');

const router = express.Router();

router.post('/', validarCrearCupon, cuponController.crearCupon);
router.get('/:id', cuponController.obtenerCupon);
router.get('/', cuponController.listarCupones);
router.put('/:id', validarActualizarCupon, cuponController.actualizarCupon);
router.delete('/:id', cuponController.eliminarCupon);

module.exports = router;
