const Producto = require('../models/product');
const Tienda = require('../models/shop'); // Asegúrate de requerir el modelo de tienda
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
    const productos = await Producto.find({ tiendaId: tiendaId }).lean().exec(); // No necesitas ObjectId aquí
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
}

module.exports = new ServicioProducto();
