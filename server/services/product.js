const Producto = require('../modelos/producto');
const DTOProducto = require('../dto/dtoProducto');

class ServicioProducto {
  async crearProducto(datosProducto) {
    const producto = new Producto(DTOProducto.aEntidad(datosProducto));
    await producto.save();
    return DTOProducto.desdeEntidad(producto);
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
    return producto ? DTOProducto.desdeEntidad(producto) : null;
  }

  async obtenerTodosLosProductos(filtro = {}) {
    const productos = await Producto.find(filtro);
    return productos.map(DTOProducto.desdeEntidad);
  }
}

module.exports = new ServicioProducto();