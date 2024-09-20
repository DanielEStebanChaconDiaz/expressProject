const Cupon = require('../models/cupon');

class CuponService {
  async crearCupon(cuponData) {
    const cupon = new Cupon(cuponData);
    return await cupon.save();
  }

  async obtenerCupon(id) {
    return await Cupon.findById(id);
  }

  async listarCupones(filtros) {
    return await Cupon.find(filtros);
  }

  async actualizarCupon(id, cuponData) {
    return await Cupon.findByIdAndUpdate(id, cuponData, { new: true });
  }

  async eliminarCupon(id) {
    return await Cupon.findByIdAndDelete(id);
  }
}

module.exports = new CuponService();
