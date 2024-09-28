const Cupon = require('../models/coupons');

class CuponService {
  async crearCupon(cuponData) {
    const cupon = new Cupon(cuponData);
    return await cupon.save();
  }

  async obtenerCupon(id) {
    return await Cupon.findById(id);
  }

  async obtenerCuponPorCodigo(codigoCupon) {
    return await Cupon.findOne({ codigo: codigoCupon });
  }  

  async listarCupones(filtros) {
    return await Cupon.find(filtros);
  }

  async marcarComoUsado(codigoCupon, usuarioId) {
    return await Cupon.findOneAndUpdate({ codigo: codigoCupon }, { $set: { usuarioId } });
  }

  async actualizarCupon(id, cuponData) {
    return await Cupon.findByIdAndUpdate(id, cuponData, { new: true });
  }

  async eliminarCupon(id) {
    return await Cupon.findByIdAndDelete(id);
  }
}

module.exports = new CuponService();
