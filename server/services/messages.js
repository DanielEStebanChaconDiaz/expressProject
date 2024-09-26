const Mensaje = require('../models/message');

class MensajeService {
  async crearMensaje(mensajeData) {
    const mensaje = new Mensaje(mensajeData);
    return await mensaje.save();
  }

  async obtenerMensaje(id) {
    return await Mensaje.findById(id);
  }

  async listarMensajes(filtros) {
    return await Mensaje.find(filtros).sort({ fecha: -1 });
  }

  async obtenerConversacion(remitenteId, receptorId, limite = 50, pagina = 1) {
    const skip = (pagina - 1) * limite;
    return await Mensaje.find({
      $or: [
        { remitenteId, receptorId },
        { remitenteId: receptorId, receptorId: remitenteId }
      ]
    })
      .sort({ fecha: -1 })
      .skip(skip)
      .limit(limite);
  }

  async eliminarMensaje(id) {
    return await Mensaje.findByIdAndDelete(id);
  }
}

module.exports = new MensajeService();