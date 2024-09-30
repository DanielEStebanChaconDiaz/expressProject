class PedidoDTO {
  /**
   * Constructor de la clase PedidoDTO.
   * @param {Object} pedido - Objeto del pedido que se va a transformar.
   */
  constructor(pedido) {
    this.usuarioId = pedido.usuarioId; // ID del usuario que realizó el pedido
    this.productos = pedido.productos.map(producto => ({
      productoId: producto.productoId, // ID del producto en el pedido
      cantidad: producto.cantidad,       // Cantidad del producto en el pedido
      precio: producto.precio,           // Precio del producto
    }));
    this.total = pedido.total;           // Total del pedido
    this.fecha = pedido.fecha;           // Fecha en que se realizó el pedido
    this.estado = pedido.estado;         // Estado del pedido (pendiente, completado, etc.)
    this.cuponAplicado = pedido.cuponAplicado; // Indica si se aplicó un cupón
  }
}

module.exports = PedidoDTO;
