const Producto = require('../models/product');
const Tienda = require('../models/shop');
const DTOProducto = require('../dto/productDto');

/**
 * Clase ServicioProducto
 * Proporciona métodos para gestionar productos en la aplicación.
 */
class ServicioProducto {
  /**
   * Crea un nuevo producto y lo asocia a una tienda.
   * @param {Object} datosProducto - Objeto con la información del producto.
   * @returns {Promise<Object>} - Devuelve el producto creado.
   */
  async crearProducto(datosProducto) {
    const producto = new Producto(DTOProducto.aEntidad(datosProducto));
    await producto.save();

    await Tienda.updateOne(
      { _id: datosProducto.tiendaId },
      { $push: { productos: producto._id } }
    );

    return DTOProducto.desdeEntidad(producto);
  }

  /**
   * Obtiene todos los productos de una tienda específica.
   * @param {String} tiendaId - ID de la tienda.
   * @returns {Promise<Array>} - Devuelve un array de productos.
   */
  async obtenerProductosPorTienda(tiendaId) {
    const productos = await Producto.find({ tiendaId: tiendaId }).lean().exec();
    return productos.map(DTOProducto.desdeEntidad);
  }

  /**
   * Obtiene un producto específico por su ID.
   * @param {String} id - Identificador único del producto.
   * @returns {Promise<Object|null>} - Devuelve el producto encontrado o null si no existe.
   */
  async obtenerProductoPorId(id) {
    const producto = await Producto.findById(id);
    return producto ? DTOProducto.desdeEntidad(producto) : null;
  }

  /**
   * Actualiza un producto existente por su ID.
   * @param {String} id - Identificador único del producto.
   * @param {Object} datosProducto - Objeto con los datos actualizados del producto.
   * @returns {Promise<Object|null>} - Devuelve el producto actualizado o null si no existe.
   */
  async actualizarProducto(id, datosProducto) {
    const producto = await Producto.findByIdAndUpdate(id, DTOProducto.aEntidad(datosProducto), { new: true });
    return producto ? DTOProducto.desdeEntidad(producto) : null;
  }

  /**
   * Elimina un producto específico por su ID y lo quita de la tienda correspondiente.
   * @param {String} id - Identificador único del producto.
   * @returns {Promise<Object|null>} - Devuelve el producto eliminado o null si no existe.
   */
  async eliminarProducto(id) {
    const producto = await Producto.findByIdAndDelete(id);
    if (producto) {
      await Tienda.updateOne(
        { productos: id },
        { $pull: { productos: id } }
      );
      return DTOProducto.desdeEntidad(producto);
    }
    return null;
  }

  /**
   * Obtiene todos los productos con un filtro opcional.
   * @param {Object} [filtro={}] - Filtro para la búsqueda de productos.
   * @returns {Promise<Array>} - Devuelve un array de productos.
   */
  async obtenerTodosLosProductos(filtro = {}) {
    const productos = await Producto.find(filtro);
    return productos.map(DTOProducto.desdeEntidad);
  }

  /**
   * Obtiene productos por categoría.
   * @param {String} categoria - Categoría de los productos.
   * @returns {Promise<Array>} - Devuelve un array de productos de la categoría especificada.
   */
  async obtenerProductosPorCategoria(categoria) {
    const productos = await Producto.find({ categoria }).lean().exec();
    return productos.map(DTOProducto.desdeEntidad);
  }

  /**
   * Obtiene productos que tienen descuento.
   * @returns {Promise<Array>} - Devuelve un array de productos con descuento.
   */
  async obtenerProductosConDescuento() {
    const productos = await Producto.find({ descuento: { $gt: 0 } }).lean().exec();
    return productos.map(DTOProducto.desdeEntidad);
  }

  /**
   * Obtiene productos de una categoría específica que tienen descuento.
   * @param {String} categoria - Categoría de los productos.
   * @returns {Promise<Array>} - Devuelve un array de productos con descuento en la categoría especificada.
   */
  async obtenerProductosPorCategoriaYDescuento(categoria) {
    const productos = await Producto.find({ categoria, descuento: { $gt: 0 } }).lean().exec();
    return productos.map(DTOProducto.desdeEntidad);
  }

  /**
   * Busca productos por nombre utilizando una búsqueda de texto.
   * @param {String} nombre - Nombre del producto a buscar.
   * @returns {Promise<Array>} - Devuelve un array de productos que coinciden con la búsqueda.
   */
  async buscarPorNombre(nombre) {
    const productos = await Producto.find({ 
      $text: { 
        $search: nombre,
        $caseSensitive: false,
        $diacriticSensitive: false
      } 
    }, { 
      score: { $meta: "textScore" } 
    })
    .sort({ score: { $meta: "textScore" } })
    .lean()
    .exec();

    return productos.map(DTOProducto.desdeEntidad);
  }
}

// Exporta una instancia de ServicioProducto
module.exports = new ServicioProducto();
