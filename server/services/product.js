const Producto = require('../models/product');
const Tienda = require('../models/shop');
const DTOProducto = require('../dto/productDto');

class ServicioProducto {
  async crearProducto(datosProducto) {
    const producto = new Producto(DTOProducto.aEntidad(datosProducto));
    await producto.save();

    await Tienda.updateOne(
      { _id: datosProducto.tiendaId },
      { $push: { productos: producto._id } }
    );

    return DTOProducto.desdeEntidad(producto);
  }

  async obtenerProductosPorTienda(tiendaId) {
    const productos = await Producto.find({ tiendaId: tiendaId }).lean().exec();
    return productos.map(DTOProducto.desdeEntidad);
  }
  
  async obtenerProductoPorId(id) {
    const producto = await Producto.findById(id);
    return producto ? DTOProducto.desdeEntidad(producto) : null;
  }

  async actualizarProducto(id, datosProducto) {
    const producto = await Producto.findByIdAndUpdate(id, DTOProducto.aEntidad(datosProducto), { new: true });
    return producto ? DTOProducto.desdeEntidad(producto) : null;
  }

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

  async obtenerTodosLosProductos(filtro = {}) {
    const productos = await Producto.find(filtro);
    return productos.map(DTOProducto.desdeEntidad);
  }

  async obtenerProductosPorCategoria(categoria) {
    const productos = await Producto.find({ categoria }).lean().exec();
    return productos.map(DTOProducto.desdeEntidad);
  }

  async obtenerProductosConDescuento() {
    const productos = await Producto.find({ descuento: { $gt: 0 } }).lean().exec();
    return productos.map(DTOProducto.desdeEntidad);
  }

  async obtenerProductosPorCategoriaYDescuento(categoria) {
    const productos = await Producto.find({ categoria, descuento: { $gt: 0 } }).lean().exec();
    return productos.map(DTOProducto.desdeEntidad);
  }

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

module.exports = new ServicioProducto();
