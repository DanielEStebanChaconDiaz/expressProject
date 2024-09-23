const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  productos: [{
    productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
    cantidad: { type: Number, required: true },
    precio: { type: Number, required: true }
  }],
  total: { type: Number, required: true },
  fecha: { type: Date, default: Date.now },
  estado: { type: String, enum: ['pendiente', 'enviado', 'entregado'], default: 'pendiente' },
  cuponAplicado: { type: mongoose.Schema.Types.ObjectId, ref: 'Cupon' }
});

const Pedido = mongoose.model('Pedido', PedidoSchema);
module.exports = Pedido;