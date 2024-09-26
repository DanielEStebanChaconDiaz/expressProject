class PedidoDTO {
    constructor(pedido) {
      this.usuarioId = pedido.usuarioId;
      this.productos = pedido.productos.map(producto => ({
        productoId: producto.productoId,
        cantidad: producto.cantidad,
        precio: producto.precio,
      }));
      this.total = pedido.total;
      this.fecha = pedido.fecha;
      this.estado = pedido.estado;
      this.cuponAplicado = pedido.cuponAplicado;
    }
  }
  
  module.exports = PedidoDTO;
  