// Importación del servicio de mensajes
const mensajeService = require('../services/messages');

/**
 * Controlador para gestionar las operaciones relacionadas con los mensajes.
 */
class MensajeController {
  
  /**
   * Crea un nuevo mensaje.
   * @param {Object} req - El objeto de la solicitud que contiene los datos del mensaje en req.body.
   * @param {Object} res - El objeto de respuesta utilizado para enviar la respuesta al cliente.
   */
  async crearMensaje(req, res) {
    try {
      const mensaje = await mensajeService.crearMensaje(req.body); // Llama al servicio para crear un mensaje
      res.status(201).json(mensaje); // Devuelve el mensaje creado con el código de estado 201
    } catch (error) {
      res.status(400).json({ mensaje: error.message }); // Manejo de errores
    }
  }

  /**
   * Obtiene un mensaje específico por su ID.
   * @param {Object} req - El objeto de la solicitud que contiene el ID del mensaje en req.params.
   * @param {Object} res - El objeto de respuesta.
   */
  async obtenerMensaje(req, res) {
    try {
      const mensaje = await mensajeService.obtenerMensaje(req.params.id); // Busca el mensaje por ID
      if (!mensaje) {
        return res.status(404).json({ mensaje: 'Mensaje no encontrado' }); // Manejo de mensaje no encontrado
      }
      res.json(mensaje); // Devuelve el mensaje encontrado
    } catch (error) {
      res.status(500).json({ mensaje: error.message }); // Manejo de errores
    }
  }

  /**
   * Lista todos los mensajes según los parámetros de consulta.
   * @param {Object} req - El objeto de la solicitud.
   * @param {Object} res - El objeto de respuesta.
   */
  async listarMensajes(req, res) {
    try {
      const mensajes = await mensajeService.listarMensajes(req.query); // Llama al servicio para listar mensajes
      res.json(mensajes); // Devuelve la lista de mensajes
    } catch (error) {
      res.status(500).json({ mensaje: error.message }); // Manejo de errores
    }
  }

  /**
   * Obtiene la conversación entre dos usuarios.
   * @param {Object} req - El objeto de la solicitud que contiene los IDs de los usuarios en req.params.
   * @param {Object} res - El objeto de respuesta.
   */
  async obtenerConversacion(req, res) {
    try {
      const { remitenteId, receptorId } = req.params; // Extrae los IDs de los usuarios
      const { limite, pagina } = req.query; // Extrae los parámetros de consulta
      const mensajes = await mensajeService.obtenerConversacion(remitenteId, receptorId, limite, pagina); // Obtiene la conversación
      res.json(mensajes); // Devuelve los mensajes de la conversación
    } catch (error) {
      res.status(500).json({ mensaje: error.message }); // Manejo de errores
    }
  }

  /**
   * Elimina un mensaje específico por su ID.
   * @param {Object} req - El objeto de la solicitud que contiene el ID del mensaje en req.params.
   * @param {Object} res - El objeto de respuesta.
   */
  async eliminarMensaje(req, res) {
    try {
      const mensaje = await mensajeService.eliminarMensaje(req.params.id); // Llama al servicio para eliminar el mensaje
      if (!mensaje) {
        return res.status(404).json({ mensaje: 'Mensaje no encontrado' }); // Manejo de mensaje no encontrado
      }
      res.json({ mensaje: 'Mensaje eliminado correctamente' }); // Confirma la eliminación
    } catch (error) {
      res.status(500).json({ mensaje: error.message }); // Manejo de errores
    }
  }
}

// Exportación de una instancia del controlador
module.exports = new MensajeController();
