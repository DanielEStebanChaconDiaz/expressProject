const express = require('express');
const router = express.Router();
const pedidoController = require('../controller/orderController');
const {
  crearPedidoValidator,
  actualizarPedidoValidator,
} = require('../validator/pedidoValidator');
const { validationResult } = require('express-validator');

router.get('/', pedidoController.obtenerPedidos);
router.get('/:id', pedidoController.obtenerPedidoPorId);
router.post('/', crearPedidoValidator, validarResultado, pedidoController.crearPedido);
router.put('/:id', actualizarPedidoValidator, validarResultado, pedidoController.actualizarPedido);
router.delete('/:id', pedidoController.eliminarPedido);

function validarResultado(req, res, next) {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  next();
}

module.exports = router;
