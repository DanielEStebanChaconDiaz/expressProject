const mensajeService = require('../services/messages');

class MensajeController {
  async crearMensaje(req, res) {
    try {
      const mensaje = await mensajeService.crearMensaje(req.body);
      res.status(201).json(mensaje);
    } catch (error) {
      res.status(400).json({ mensaje: error.message });
    }
  }

  async obtenerMensaje(req, res) {
    try {
      const mensaje = await mensajeService.obtenerMensaje(req.params.id);
      if (!mensaje) {
        return res.status(404).json({ mensaje: 'Mensaje no encontrado' });
      }
      res.json(mensaje);
    } catch (error) {
      res.status(500).json({ mensaje: error.message });
    }
  }

  async listarMensajes(req, res) {
    try {
      const mensajes = await mensajeService.listarMensajes(req.query);
      res.json(mensajes);
    } catch (error) {
      res.status(500).json({ mensaje: error.message });
    }
  }

  async obtenerConversacion(req, res) {
    try {
      const { remitenteId, receptorId } = req.params;
      const { limite, pagina } = req.query;
      const mensajes = await mensajeService.obtenerConversacion(remitenteId, receptorId, limite, pagina);
      res.json(mensajes);
    } catch (error) {
      res.status(500).json({ mensaje: error.message });
    }
  }

  async eliminarMensaje(req, res) {
    try {
      const mensaje = await mensajeService.eliminarMensaje(req.params.id);
      if (!mensaje) {
        return res.status(404).json({ mensaje: 'Mensaje no encontrado' });
      }
      res.json({ mensaje: 'Mensaje eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ mensaje: error.message });
    }
  }
}

module.exports = new MensajeController();