const Mensaje = require('../models/message');

/**
 * Clase MensajeService
 * Proporciona métodos para gestionar mensajes en la aplicación.
 */
class MensajeService {
  /**
   * Crea un nuevo mensaje en la base de datos.
   * @param {Object} mensajeData - Objeto con la información del mensaje (contenido, remitente, receptor).
   * @returns {Promise<Object>} - Devuelve el mensaje creado.
   */
  async crearMensaje(mensajeData) {
    const mensaje = new Mensaje(mensajeData);
    return await mensaje.save();
  }

  /**
   * Obtiene un mensaje específico por su ID.
   * @param {String} id - Identificador único del mensaje.
   * @returns {Promise<Object|null>} - Devuelve el mensaje encontrado o null si no existe.
   */
  async obtenerMensaje(id) {
    return await Mensaje.findById(id);
  }

  /**
   * Lista todos los mensajes que cumplen con los filtros especificados.
   * @param {Object} filtros - Objeto con condiciones de filtrado (por remitente, receptor).
   * @returns {Promise<Array>} - Devuelve un array de mensajes ordenados por fecha en orden descendente.
   */
  async listarMensajes(filtros) {
    return await Mensaje.find(filtros).sort({ fecha: -1 });
  }

  /**
   * Obtiene la conversación entre dos usuarios, con paginación.
   * @param {String} remitenteId - ID del remitente.
   * @param {String} receptorId - ID del receptor.
   * @param {Number} limite - Número máximo de mensajes a recuperar (por defecto, 50).
   * @param {Number} pagina - Número de la página de resultados (por defecto, 1).
   * @returns {Promise<Array>} - Devuelve un array de mensajes que representan la conversación.
   */
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

  /**
   * Elimina un mensaje específico por su ID.
   * @param {String} id - Identificador único del mensaje.
   * @returns {Promise<Object|null>} - Devuelve el mensaje eliminado o null si no existe.
   */
  async eliminarMensaje(id) {
    return await Mensaje.findByIdAndDelete(id);
  }
}

// Exporta una instancia de MensajeService
module.exports = new MensajeService();
