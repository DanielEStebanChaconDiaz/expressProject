// Importación del servicio de productos
const servicioProducto = require('../services/product');

/**
 * Controlador de productos que gestiona las operaciones relacionadas con los productos.
 */
class ControladorProducto {
  
  /**
   * Crea un nuevo producto.
   * @param {Object} req - Objeto de la solicitud que contiene los datos del producto en req.body.
   * @param {Object} res - Objeto de respuesta utilizado para enviar la respuesta al cliente.
   */
  async crearProducto(req, res) {
    try {
      const producto = await servicioProducto.crearProducto(req.body);
      res.status(201).json(producto); // Responde con el producto creado y código 201
    } catch (error) {
      res.status(400).json({ mensaje: error.message }); // Manejo de errores
    }
  }

  /**
   * Obtiene todos los productos de una tienda específica.
   * @param {Object} req - Objeto de la solicitud que contiene el ID de la tienda en req.params.tiendaId.
   * @param {Object} res - Objeto de respuesta utilizado para enviar la respuesta al cliente.
   */
  async obtenerProductosPorTienda(req, res) {
    try {
      const productos = await servicioProducto.obtenerProductosPorTienda(req.params.tiendaId);
      res.json(productos); // Responde con la lista de productos
    } catch (error) {
      res.status(500).json({ mensaje: error.message }); // Manejo de errores
    }
  }

  /**
   * Obtiene un producto específico por su ID.
   * @param {Object} req - Objeto de la solicitud que contiene el ID del producto en req.params.id.
   * @param {Object} res - Objeto de respuesta utilizado para enviar la respuesta al cliente.
   */
  async obtenerProducto(req, res) {
    try {
      const producto = await servicioProducto.obtenerProductoPorId(req.params.id);
      if (producto) {
        res.json(producto); // Responde con el producto encontrado
      } else {
        res.status(404).json({ mensaje: 'Producto no encontrado' }); // Manejo de producto no encontrado
      }
    } catch (error) {
      res.status(500).json({ mensaje: error.message }); // Manejo de errores
    }
  }

  /**
   * Actualiza un producto existente por su ID.
   * @param {Object} req - Objeto de la solicitud que contiene el ID del producto y los nuevos datos en req.body.
   * @param {Object} res - Objeto de respuesta utilizado para enviar la respuesta al cliente.
   */
  async actualizarProducto(req, res) {
    try {
      const producto = await servicioProducto.actualizarProducto(req.params.id, req.body);
      if (producto) {
        res.json(producto); // Responde con el producto actualizado
      } else {
        res.status(404).json({ mensaje: 'Producto no encontrado' }); // Manejo de producto no encontrado
      }
    } catch (error) {
      res.status(400).json({ mensaje: error.message }); // Manejo de errores
    }
  }

  /**
   * Elimina un producto por su ID.
   * @param {Object} req - Objeto de la solicitud que contiene el ID del producto en req.params.id.
   * @param {Object} res - Objeto de respuesta utilizado para enviar la respuesta al cliente.
   */
  async eliminarProducto(req, res) {
    try {
      const producto = await servicioProducto.eliminarProducto(req.params.id);
      if (producto) {
        res.json({ mensaje: 'Producto eliminado exitosamente' }); // Responde con un mensaje de éxito
      } else {
        res.status(404).json({ mensaje: 'Producto no encontrado' }); // Manejo de producto no encontrado
      }
    } catch (error) {
      res.status(500).json({ mensaje: error.message }); // Manejo de errores
    }
  }

  /**
   * Obtiene todos los productos.
   * @param {Object} req - Objeto de la solicitud.
   * @param {Object} res - Objeto de respuesta utilizado para enviar la respuesta al cliente.
   */
  async obtenerTodosLosProductos(req, res) {
    try {
      const productos = await servicioProducto.obtenerTodosLosProductos();
      res.json(productos); // Responde con la lista de todos los productos
    } catch (error) {
      res.status(500).json({ mensaje: error.message }); // Manejo de errores
    }
  }

  /**
   * Obtiene productos por categoría.
   * @param {Object} req - Objeto de la solicitud que contiene la categoría en req.params.categoria.
   * @param {Object} res - Objeto de respuesta utilizado para enviar la respuesta al cliente.
   */
  async obtenerProductosPorCategoria(req, res) {
    try {
      const productos = await servicioProducto.obtenerProductosPorCategoria(req.params.categoria);
      res.json(productos); // Responde con la lista de productos de la categoría especificada
    } catch (error) {
      res.status(500).json({ mensaje: error.message }); // Manejo de errores
    }
  }

  /**
   * Obtiene productos que tienen descuento.
   * @param {Object} req - Objeto de la solicitud.
   * @param {Object} res - Objeto de respuesta utilizado para enviar la respuesta al cliente.
   */
  async obtenerProductosConDescuento(req, res) {
    try {
      const productos = await servicioProducto.obtenerProductosConDescuento();
      res.json(productos); // Responde con la lista de productos en descuento
    } catch (error) {
      res.status(500).json({ mensaje: error.message }); // Manejo de errores
    }
  }

  /**
   * Obtiene productos por categoría y que tienen descuento.
   * @param {Object} req - Objeto de la solicitud que contiene la categoría en req.params.categoria.
   * @param {Object} res - Objeto de respuesta utilizado para enviar la respuesta al cliente.
   */
  async obtenerProductosPorCategoriaYDescuento(req, res) {
    try {
      const productos = await servicioProducto.obtenerProductosPorCategoriaYDescuento(req.params.categoria);
      res.json(productos); // Responde con la lista de productos que cumplen con la categoría y el descuento
    } catch (error) {
      res.status(500).json({ mensaje: error.message }); // Manejo de errores
    }
  }
}

// Exporta una nueva instancia del controlador de productos
module.exports = new ControladorProducto();
