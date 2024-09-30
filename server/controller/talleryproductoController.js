// Importación de los servicios de producto y taller
const ServicioProducto = require('../services/product');
const TallerService = require('../services/workshop');

/**
 * Controlador para realizar búsquedas combinadas de productos y talleres.
 */
class ControladorBusquedaCombinada {
  
  /**
   * Busca productos y talleres por nombre.
   * @param {Object} req - Objeto de la solicitud que contiene los parámetros de búsqueda en req.query.
   * @param {Object} res - Objeto de respuesta utilizado para enviar la respuesta al cliente.
   */
  async buscarPorNombre(req, res) {
    try {
      const { nombre } = req.query;

      // Verifica si se proporcionó un nombre para la búsqueda
      if (!nombre) {
        return res.status(400).json({ mensaje: 'Se requiere un nombre para la búsqueda' }); // Respuesta de error si no hay nombre
      }

      // Realiza las búsquedas en los servicios correspondientes
      const productos = await ServicioProducto.buscarPorNombre(nombre);
      const talleres = await TallerService.buscarPorNombre(nombre);

      // Construye el objeto de resultados
      const resultados = {
        productos,
        talleres,
        total: productos.length + talleres.length // Total de resultados encontrados
      };

      // Verifica si no se encontraron resultados
      if (resultados.total === 0) {
        return res.status(404).json({ mensaje: 'No se encontraron resultados para la búsqueda' }); // Respuesta si no hay resultados
      }

      res.json(resultados); // Responde con los resultados encontrados
    } catch (error) {
      console.error('Error en la búsqueda combinada:', error); // Registro de errores en la consola
      res.status(500).json({ mensaje: 'Error interno del servidor' }); // Respuesta de error para problemas internos
    }
  }
}

// Exporta una nueva instancia del controlador de búsqueda combinada
module.exports = new ControladorBusquedaCombinada();
