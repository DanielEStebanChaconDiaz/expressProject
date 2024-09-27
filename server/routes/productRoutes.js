const express = require('express');
const router = express.Router();
const controladorProducto = require('../controller/productController');
const { validadorCrearProducto, validadorActualizarProducto, validadorObtenerProducto } = require('../validator/productValidator');
const { validationResult } = require('express-validator');

const manejarErroresValidacion = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  next();
};

router.post('/', validadorCrearProducto, manejarErroresValidacion, controladorProducto.crearProducto);

router.get('/:id', validadorObtenerProducto, manejarErroresValidacion, controladorProducto.obtenerProducto);

router.put('/:id', validadorActualizarProducto, manejarErroresValidacion, controladorProducto.actualizarProducto);

router.delete('/:id', validadorObtenerProducto, manejarErroresValidacion, controladorProducto.eliminarProducto);

router.get('/', controladorProducto.obtenerTodosLosProductos);

router.get('/tienda/:tiendaId', controladorProducto.obtenerProductosPorTienda);

module.exports = router;