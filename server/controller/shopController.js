// Importación del servicio de tiendas y del DTO correspondiente
const tiendaService = require('../services/shop');
const TiendaDTO = require('../dto/tiendaDto');

/**
 * Controlador de tiendas que gestiona las operaciones relacionadas con las tiendas.
 */
class TiendaController {
  
  /**
   * Obtiene todas las tiendas.
   * @param {Object} req - Objeto de la solicitud.
   * @param {Object} res - Objeto de respuesta utilizado para enviar la respuesta al cliente.
   */
  async getAll(req, res) {
    try {
      const tiendas = await tiendaService.getAll();
      res.json(tiendas.map(tienda => new TiendaDTO(tienda))); // Responde con la lista de tiendas
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las tiendas', error }); // Manejo de errores
    }
  }

  /**
   * Obtiene una tienda específica por su ID.
   * @param {Object} req - Objeto de la solicitud que contiene el ID de la tienda en req.params.id.
   * @param {Object} res - Objeto de respuesta utilizado para enviar la respuesta al cliente.
   */
  async getById(req, res) {
    try {
      const tienda = await tiendaService.getById(req.params.id);
      if (!tienda) {
        return res.status(404).json({ message: 'Tienda no encontrada' }); // Manejo de tienda no encontrada
      }
      res.json(new TiendaDTO(tienda)); // Responde con la tienda encontrada
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la tienda', error }); // Manejo de errores
    }
  }

  /**
   * Crea una nueva tienda.
   * @param {Object} req - Objeto de la solicitud que contiene los datos de la tienda en req.body.
   * @param {Object} res - Objeto de respuesta utilizado para enviar la respuesta al cliente.
   */
  async create(req, res) {
    try {
      const tienda = await tiendaService.create(req.body);
      res.status(201).json(new TiendaDTO(tienda)); // Responde con la tienda creada y código 201
    } catch (error) {
      res.status(400).json({ message: 'Error al crear la tienda', error }); // Manejo de errores
    }
  }

  /**
   * Actualiza una tienda existente por su ID.
   * @param {Object} req - Objeto de la solicitud que contiene el ID de la tienda y los nuevos datos en req.body.
   * @param {Object} res - Objeto de respuesta utilizado para enviar la respuesta al cliente.
   */
  async update(req, res) {
    try {
      const tienda = await tiendaService.update(req.params.id, req.body);
      if (!tienda) {
        return res.status(404).json({ message: 'Tienda no encontrada' }); // Manejo de tienda no encontrada
      }
      res.json(new TiendaDTO(tienda)); // Responde con la tienda actualizada
    } catch (error) {
      res.status(400).json({ message: 'Error al actualizar la tienda', error }); // Manejo de errores
    }
  }

  /**
   * Elimina una tienda por su ID.
   * @param {Object} req - Objeto de la solicitud que contiene el ID de la tienda en req.params.id.
   * @param {Object} res - Objeto de respuesta utilizado para enviar la respuesta al cliente.
   */
  async delete(req, res) {
    try {
      const tienda = await tiendaService.delete(req.params.id);
      if (!tienda) {
        return res.status(404).json({ message: 'Tienda no encontrada' }); // Manejo de tienda no encontrada
      }
      res.status(204).send(); // Responde con un estado 204 sin contenido
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar la tienda', error }); // Manejo de errores
    }
  }
}

// Exporta una nueva instancia del controlador de tiendas
module.exports = new TiendaController();
