const cuponService = require('../services/cuponService');

class CuponController {
  async crearCupon(req, res) {
    try {
      const cupon = await cuponService.crearCupon(req.body);
      res.status(201).json(cupon);
    } catch (error) {
      res.status(400).json({ mensaje: error.message });
    }
  }

  async obtenerCupon(req, res) {
    try {
      const cupon = await cuponService.obtenerCupon(req.params.id);
      if (!cupon) {
        return res.status(404).json({ mensaje: 'Cupón no encontrado' });
      }
      res.json(cupon);
    } catch (error) {
      res.status(500).json({ mensaje: error.message });
    }
  }

  async listarCupones(req, res) {
    try {
      const cupones = await cuponService.listarCupones(req.query);
      res.json(cupones);
    } catch (error) {
      res.status(500).json({ mensaje: error.message });
    }
  }

  async actualizarCupon(req, res) {
    try {
      const cupon = await cuponService.actualizarCupon(req.params.id, req.body);
      if (!cupon) {
        return res.status(404).json({ mensaje: 'Cupón no encontrado' });
      }
      res.json(cupon);
    } catch (error) {
      res.status(400).json({ mensaje: error.message });
    }
  }

  async eliminarCupon(req, res) {
    try {
      const cupon = await cuponService.eliminarCupon(req.params.id);
      if (!cupon) {
        return res.status(404).json({ mensaje: 'Cupón no encontrado' });
      }
      res.json({ mensaje: 'Cupón eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ mensaje: error.message });
    }
  }
}

module.exports = new CuponController();