const Tienda = require('../models/shop');

/**
 * Clase TiendaService
 * Proporciona métodos para gestionar tiendas en la aplicación.
 */
class TiendaService {
  /**
   * Obtiene todas las tiendas de la base de datos.
   * @returns {Promise<Array>} - Devuelve un array de tiendas.
   */
  async getAll() {
    return await Tienda.find();
  }

  /**
   * Obtiene una tienda específica por su ID.
   * @param {String} id - Identificador único de la tienda.
   * @returns {Promise<Object|null>} - Devuelve la tienda encontrada o null si no existe.
   */
  async getById(id) {
    return await Tienda.findById(id);
  }

  /**
   * Crea una nueva tienda en la base de datos.
   * @param {Object} data - Objeto con la información de la tienda.
   * @returns {Promise<Object>} - Devuelve la tienda creada.
   */
  async create(data) {
    const tienda = new Tienda(data);
    return await tienda.save();
  }

  /**
   * Actualiza una tienda existente por su ID.
   * @param {String} id - Identificador único de la tienda.
   * @param {Object} data - Objeto con los datos actualizados de la tienda.
   * @returns {Promise<Object|null>} - Devuelve la tienda actualizada o null si no existe.
   */
  async update(id, data) {
    return await Tienda.findByIdAndUpdate(id, data, { new: true });
  }

  /**
   * Elimina una tienda específica por su ID.
   * @param {String} id - Identificador único de la tienda.
   * @returns {Promise<Object|null>} - Devuelve la tienda eliminada o null si no existe.
   */
  async delete(id) {
    return await Tienda.findByIdAndDelete(id);
  }
}

// Exporta una instancia de TiendaService
module.exports = new TiendaService();
