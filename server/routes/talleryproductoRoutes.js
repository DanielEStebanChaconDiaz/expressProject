const express = require('express');
const router = express.Router();
const ControladorBusquedaCombinada = require('../controller/talleryproductoController');


router.get('/busqueda', ControladorBusquedaCombinada.buscarPorNombre);

module.exports = router;