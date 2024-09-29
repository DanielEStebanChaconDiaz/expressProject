const ServicioProducto = require('../services/product');
const TallerService = require('../services/workshop');

class ControladorBusquedaCombinada {
  async buscarPorNombre(req, res) {
    try {
      const { nombre } = req.query;
      
      if (!nombre) {
        return res.status(400).json({ mensaje: 'Se requiere un nombre para la búsqueda' });
      }

      const productos = await ServicioProducto.buscarPorNombre(nombre);
      const talleres = await TallerService.buscarPorNombre(nombre);

      const resultados = {
        productos,
        talleres,
        total: productos.length + talleres.length
      };

      if (resultados.total === 0) {
        return res.status(404).json({ mensaje: 'No se encontraron resultados para la búsqueda' });
      }

      res.json(resultados);
    } catch (error) {
      console.error('Error en la búsqueda combinada:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }
}

module.exports = new ControladorBusquedaCombinada();