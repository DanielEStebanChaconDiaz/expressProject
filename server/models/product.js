const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
  tiendaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tienda', required: true },
  imagen: { type: String },
  nombre: { type: String, required: true, index: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  dimensiones: { type: String },
  disponibilidad: { type: Number, required: true, min: 0 },
  descuento: { type: Number, default: 0 },
  categoria: { type: String, required: true },
  tipo: { type: String, enum: ['bordado', 'ceramica', 'joyeria', 'textiles'] }
});

const Producto = mongoose.model('Producto', ProductoSchema);
module.exports = Producto;